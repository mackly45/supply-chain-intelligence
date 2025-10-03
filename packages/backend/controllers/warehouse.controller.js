// Contrôleur des entrepôts
const WarehouseService = require('../services/warehouse.service');

class WarehouseController {
  // Créer un entrepôt
  async createWarehouse(req, res) {
    try {
      const userId = req.user.id;
      const warehouseData = req.body;
      const warehouse = await WarehouseService.createWarehouse(warehouseData, userId);
      res.status(201).json(warehouse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer tous les entrepôts
  async getAllWarehouses(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        name: req.query.name,
        manager_id: req.query.manager_id
      };

      const result = await WarehouseService.getAllWarehouses(page, limit, filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer un entrepôt par ID
  async getWarehouseById(req, res) {
    try {
      const { id } = req.params;
      const warehouse = await WarehouseService.getWarehouseById(id);
      res.json(warehouse);
    } catch (error) {
      if (error.message === 'Entrepôt non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Mettre à jour un entrepôt
  async updateWarehouse(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const warehouseData = req.body;
      const warehouse = await WarehouseService.updateWarehouse(id, warehouseData, userId);
      res.json(warehouse);
    } catch (error) {
      if (error.message === 'Entrepôt non trouvé') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Permission refusée') {
        res.status(403).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Supprimer un entrepôt
  async deleteWarehouse(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const result = await WarehouseService.deleteWarehouse(id, userId);
      res.json(result);
    } catch (error) {
      if (error.message === 'Entrepôt non trouvé') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Permission refusée') {
        res.status(403).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Rechercher des entrepôts par localisation
  async searchWarehousesByLocation(req, res) {
    try {
      const { latitude, longitude, radius } = req.query;
      const warehouses = await WarehouseService.searchWarehousesByLocation(
        parseFloat(latitude),
        parseFloat(longitude),
        parseInt(radius) || 10000
      );
      res.json(warehouses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WarehouseController();