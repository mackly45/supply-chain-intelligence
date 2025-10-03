// Routes d'inventaire
const express = require('express');
const InventoryController = require('../controllers/inventory.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Créer ou mettre à jour un niveau d'inventaire (ADMIN seulement)
router.post('/', authenticateToken, authorizeRole(['ADMIN']), InventoryController.upsertInventory);

// Récupérer tous les niveaux d'inventaire
router.get('/', authenticateToken, InventoryController.getAllInventory);

// Récupérer un niveau d'inventaire par ID
router.get('/:id', authenticateToken, InventoryController.getInventoryById);

// Récupérer l'inventaire par entrepôt et produit
router.get('/:warehouseId/:productId', authenticateToken, InventoryController.getInventoryByWarehouseAndProduct);

// Mettre à jour les quantités d'inventaire
router.post('/:warehouseId/:productId/update', authenticateToken, InventoryController.updateInventoryQuantities);

// Réserver de l'inventaire
router.post('/:warehouseId/:productId/reserve', authenticateToken, InventoryController.reserveInventory);

// Libérer de l'inventaire réservé
router.post('/:warehouseId/:productId/release', authenticateToken, InventoryController.releaseReservedInventory);

// Récupérer les mouvements d'inventaire
router.get('/:inventoryId/movements', authenticateToken, InventoryController.getInventoryMovements);

// Obtenir les alertes de stock bas
router.get('/alerts/low-stock', authenticateToken, InventoryController.getLowStockAlerts);

module.exports = router;