// Contrôleur de suivi des véhicules
const VehicleTrackingService = require('../services/vehicle-tracking.service');

class VehicleTrackingController {
  // Mettre à jour la position d'un véhicule
  async updateVehiclePosition(req, res) {
    try {
      const { vehicleId } = req.params;
      const positionData = req.body;
      const position = await VehicleTrackingService.updateVehiclePosition(vehicleId, positionData);
      res.status(201).json(position);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer la position actuelle d'un véhicule
  async getVehicleCurrentPosition(req, res) {
    try {
      const { vehicleId } = req.params;
      const position = await VehicleTrackingService.getVehicleCurrentPosition(vehicleId);
      res.json(position);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer l'historique des positions d'un véhicule
  async getVehiclePositionHistory(req, res) {
    try {
      const { vehicleId } = req.params;
      const { startDate, endDate, limit } = req.query;
      
      const positions = await VehicleTrackingService.getVehiclePositionHistory(
        vehicleId,
        startDate,
        endDate,
        parseInt(limit) || 100
      );
      
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer toutes les positions récentes
  async getAllRecentPositions(req, res) {
    try {
      const minutes = parseInt(req.query.minutes) || 30;
      const positions = await VehicleTrackingService.getAllRecentPositions(minutes);
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Calculer la vitesse moyenne d'un véhicule
  async calculateAverageSpeed(req, res) {
    try {
      const { vehicleId } = req.params;
      const { startDate, endDate } = req.query;
      
      const averageSpeed = await VehicleTrackingService.calculateAverageSpeed(vehicleId, startDate, endDate);
      res.json({ averageSpeed });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Envoyer une commande à un véhicule
  async sendVehicleCommand(req, res) {
    try {
      const { vehicleId } = req.params;
      const { command, payload } = req.body;
      
      const result = await VehicleTrackingService.sendVehicleCommand(vehicleId, command, payload);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir les statistiques de suivi
  async getTrackingStatistics(req, res) {
    try {
      const statistics = await VehicleTrackingService.getTrackingStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VehicleTrackingController();