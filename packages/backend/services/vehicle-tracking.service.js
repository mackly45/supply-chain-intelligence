// Service de suivi des véhicules
const { Vehicle, VehiclePosition, Driver } = require('../models');
const mqtt = require('mqtt');

class VehicleTrackingService {
  constructor() {
    this.mqttClient = null;
    this.positions = new Map(); // Cache en mémoire pour les positions récentes
  }

  // Initialiser la connexion MQTT
  async initMQTT() {
    try {
      if (process.env.MQTT_BROKER_URL) {
        this.mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL);
        
        this.mqttClient.on('connect', () => {
          console.log('Connecté au broker MQTT pour le suivi des véhicules');
          // S'abonner aux topics de position
          this.mqttClient.subscribe('vehicles/+/position');
        });

        this.mqttClient.on('message', (topic, message) => {
          this.handleVehiclePositionMessage(topic, message);
        });

        this.mqttClient.on('error', (error) => {
          console.error('Erreur de connexion MQTT:', error);
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation MQTT:', error);
    }
  }

  // Gérer les messages de position des véhicules
  async handleVehiclePositionMessage(topic, message) {
    try {
      if (topic.startsWith('vehicles/') && topic.endsWith('/position')) {
        const vehicleId = topic.split('/')[1];
        const positionData = JSON.parse(message.toString());
        
        // Mettre à jour la position en base de données
        await this.updateVehiclePosition(vehicleId, positionData);
        
        // Mettre à jour le cache
        this.positions.set(vehicleId, {
          ...positionData,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Erreur lors du traitement du message de position:', error);
    }
  }

  // Mettre à jour la position d'un véhicule
  async updateVehiclePosition(vehicleId, positionData) {
    try {
      // Vérifier si le véhicule existe
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        throw new Error('Véhicule non trouvé');
      }

      // Créer une nouvelle position
      const position = await VehiclePosition.create({
        vehicle_id: vehicleId,
        latitude: positionData.latitude,
        longitude: positionData.longitude,
        speed: positionData.speed,
        heading: positionData.heading
      });

      return position;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la position du véhicule: ${error.message}`);
    }
  }

  // Récupérer la position actuelle d'un véhicule
  async getVehicleCurrentPosition(vehicleId) {
    try {
      // Vérifier d'abord le cache
      if (this.positions.has(vehicleId)) {
        const cachedPosition = this.positions.get(vehicleId);
        // Vérifier si la position est récente (moins de 5 minutes)
        if (new Date() - cachedPosition.timestamp < 5 * 60 * 1000) {
          return cachedPosition;
        }
      }

      // Sinon, récupérer depuis la base de données
      const position = await VehiclePosition.findOne({
        where: { vehicle_id: vehicleId },
        order: [['timestamp', 'DESC']]
      });

      if (position) {
        // Mettre à jour le cache
        this.positions.set(vehicleId, {
          ...position.toJSON(),
          timestamp: new Date()
        });
      }

      return position;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la position du véhicule: ${error.message}`);
    }
  }

  // Récupérer l'historique des positions d'un véhicule
  async getVehiclePositionHistory(vehicleId, startDate, endDate, limit = 100) {
    try {
      const whereClause = { vehicle_id: vehicleId };
      
      if (startDate) {
        whereClause.timestamp = { ...whereClause.timestamp, [VehiclePosition.sequelize.Op.gte]: new Date(startDate) };
      }
      
      if (endDate) {
        whereClause.timestamp = { ...whereClause.timestamp, [VehiclePosition.sequelize.Op.lte]: new Date(endDate) };
      }

      const positions = await VehiclePosition.findAll({
        where: whereClause,
        order: [['timestamp', 'DESC']],
        limit: limit
      });

      return positions;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'historique des positions: ${error.message}`);
    }
  }

  // Récupérer toutes les positions récentes
  async getAllRecentPositions(minutes = 30) {
    try {
      const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
      
      const positions = await VehiclePosition.findAll({
        where: {
          timestamp: {
            [VehiclePosition.sequelize.Op.gte]: cutoffTime
          }
        },
        order: [['timestamp', 'DESC']],
        include: [{
          model: Vehicle,
          as: 'vehicle',
          attributes: ['id', 'registration_number']
        }]
      });

      // Regrouper par véhicule
      const vehiclePositions = {};
      positions.forEach(position => {
        const vehicleId = position.vehicle_id;
        if (!vehiclePositions[vehicleId]) {
          vehiclePositions[vehicleId] = [];
        }
        vehiclePositions[vehicleId].push(position);
      });

      return vehiclePositions;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des positions récentes: ${error.message}`);
    }
  }

  // Calculer la distance entre deux points (formule de Haversine)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
  }

  // Convertir des degrés en radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Calculer la vitesse moyenne d'un véhicule sur une période
  async calculateAverageSpeed(vehicleId, startDate, endDate) {
    try {
      const positions = await this.getVehiclePositionHistory(vehicleId, startDate, endDate);
      
      if (positions.length < 2) {
        return 0;
      }

      let totalDistance = 0;
      let totalTime = 0;

      for (let i = 1; i < positions.length; i++) {
        const prevPos = positions[i - 1];
        const currentPos = positions[i];
        
        const distance = this.calculateDistance(
          prevPos.latitude, prevPos.longitude,
          currentPos.latitude, currentPos.longitude
        );
        
        const timeDiff = (new Date(currentPos.timestamp) - new Date(prevPos.timestamp)) / 1000 / 3600; // heures
        
        totalDistance += distance;
        totalTime += timeDiff;
      }

      return totalTime > 0 ? (totalDistance / totalTime) : 0; // km/h
    } catch (error) {
      throw new Error(`Erreur lors du calcul de la vitesse moyenne: ${error.message}`);
    }
  }

  // Envoyer une commande à un véhicule via MQTT
  async sendVehicleCommand(vehicleId, command, payload = {}) {
    try {
      if (!this.mqttClient || !this.mqttClient.connected) {
        throw new Error('Client MQTT non connecté');
      }

      const topic = `vehicles/${vehicleId}/commands`;
      const message = JSON.stringify({
        command,
        payload,
        timestamp: new Date().toISOString()
      });

      this.mqttClient.publish(topic, message);
      return { success: true, message: 'Commande envoyée' };
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi de la commande au véhicule: ${error.message}`);
    }
  }

  // Obtenir les statistiques de suivi
  async getTrackingStatistics() {
    try {
      const totalVehicles = await Vehicle.count();
      
      const activeVehicles = await Vehicle.count({
        where: {
          status: 'IN_USE'
        }
      });

      const positionsLastHour = await VehiclePosition.count({
        where: {
          timestamp: {
            [VehiclePosition.sequelize.Op.gte]: new Date(Date.now() - 60 * 60 * 1000)
          }
        }
      });

      return {
        totalVehicles,
        activeVehicles,
        positionsLastHour
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des statistiques de suivi: ${error.message}`);
    }
  }
}

module.exports = new VehicleTrackingService();