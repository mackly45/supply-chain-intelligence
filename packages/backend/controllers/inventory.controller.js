// Contrôleur d'inventaire
const InventoryService = require('../services/inventory.service');

class InventoryController {
  // Créer ou mettre à jour un niveau d'inventaire
  async upsertInventory(req, res) {
    try {
      const userId = req.user.id;
      const inventoryData = req.body;
      const inventory = await InventoryService.upsertInventory(inventoryData, userId);
      res.status(201).json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer tous les niveaux d'inventaire
  async getAllInventory(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        warehouse_id: req.query.warehouse_id,
        product_id: req.query.product_id
      };

      const result = await InventoryService.getAllInventory(page, limit, filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer un niveau d'inventaire par ID
  async getInventoryById(req, res) {
    try {
      const { id } = req.params;
      const inventory = await InventoryService.getInventoryById(id);
      res.json(inventory);
    } catch (error) {
      if (error.message === 'Niveau d\'inventaire non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Récupérer l'inventaire par entrepôt et produit
  async getInventoryByWarehouseAndProduct(req, res) {
    try {
      const { warehouseId, productId } = req.params;
      const inventory = await InventoryService.getInventoryByWarehouseAndProduct(warehouseId, productId);
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mettre à jour les quantités d'inventaire
  async updateInventoryQuantities(req, res) {
    try {
      const { warehouseId, productId } = req.params;
      const userId = req.user.id;
      const { quantityChange, movementType, reference } = req.body;
      
      const result = await InventoryService.updateInventoryQuantities(
        warehouseId, 
        productId, 
        quantityChange, 
        movementType, 
        userId, 
        reference
      );
      
      res.json(result);
    } catch (error) {
      if (error.message === 'Quantité insuffisante en stock') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Réserver de l'inventaire
  async reserveInventory(req, res) {
    try {
      const { warehouseId, productId } = req.params;
      const userId = req.user.id;
      const { quantity, reference } = req.body;
      
      const result = await InventoryService.reserveInventory(warehouseId, productId, quantity, userId, reference);
      res.json(result);
    } catch (error) {
      if (error.message === 'Quantité insuffisante disponible pour réservation') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Libérer de l'inventaire réservé
  async releaseReservedInventory(req, res) {
    try {
      const { warehouseId, productId } = req.params;
      const userId = req.user.id;
      const { quantity, reference } = req.body;
      
      const result = await InventoryService.releaseReservedInventory(warehouseId, productId, quantity, userId, reference);
      res.json(result);
    } catch (error) {
      if (error.message === 'Quantité réservée insuffisante') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Récupérer les mouvements d'inventaire
  async getInventoryMovements(req, res) {
    try {
      const { inventoryId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await InventoryService.getInventoryMovements(inventoryId, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir les alertes de stock bas
  async getLowStockAlerts(req, res) {
    try {
      const threshold = parseInt(req.query.threshold) || 10;
      const alerts = await InventoryService.getLowStockAlerts(threshold);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InventoryController();