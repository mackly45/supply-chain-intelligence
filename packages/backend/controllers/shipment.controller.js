// Contrôleur des expéditions
const ShipmentService = require('../services/shipment.service');

class ShipmentController {
  // Créer une expédition
  async createShipment(req, res) {
    try {
      const userId = req.user.id;
      const shipmentData = req.body;
      const shipment = await ShipmentService.createShipment(shipmentData, userId);
      res.status(201).json(shipment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer toutes les expéditions
  async getAllShipments(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        status: req.query.status,
        tracking_number: req.query.tracking_number,
        origin_warehouse_id: req.query.origin_warehouse_id,
        destination_warehouse_id: req.query.destination_warehouse_id
      };

      const result = await ShipmentService.getAllShipments(page, limit, filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer une expédition par ID
  async getShipmentById(req, res) {
    try {
      const { id } = req.params;
      const shipment = await ShipmentService.getShipmentById(id);
      res.json(shipment);
    } catch (error) {
      if (error.message === 'Expédition non trouvée') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Récupérer une expédition par numéro de suivi
  async getShipmentByTrackingNumber(req, res) {
    try {
      const { trackingNumber } = req.params;
      const shipment = await ShipmentService.getShipmentByTrackingNumber(trackingNumber);
      res.json(shipment);
    } catch (error) {
      if (error.message === 'Expédition non trouvée') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Mettre à jour une expédition
  async updateShipment(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const shipmentData = req.body;
      const shipment = await ShipmentService.updateShipment(id, shipmentData, userId);
      res.json(shipment);
    } catch (error) {
      if (error.message === 'Expédition non trouvée') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Mettre à jour le statut d'une expédition
  async updateShipmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;
      const shipment = await ShipmentService.updateShipmentStatus(id, status, userId);
      res.json(shipment);
    } catch (error) {
      if (error.message === 'Expédition non trouvée') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Statut invalide') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Supprimer une expédition
  async deleteShipment(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const result = await ShipmentService.deleteShipment(id, userId);
      res.json(result);
    } catch (error) {
      if (error.message === 'Expédition non trouvée') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Rechercher des expéditions
  async searchShipments(req, res) {
    try {
      const { query } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await ShipmentService.searchShipments(query, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir les statistiques des expéditions
  async getShipmentStatistics(req, res) {
    try {
      const statistics = await ShipmentService.getShipmentStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ShipmentController();