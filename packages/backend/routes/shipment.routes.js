// Routes des expéditions
const express = require('express');
const ShipmentController = require('../controllers/shipment.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Créer une expédition
router.post('/', authenticateToken, ShipmentController.createShipment);

// Récupérer toutes les expéditions
router.get('/', authenticateToken, ShipmentController.getAllShipments);

// Récupérer une expédition par ID
router.get('/:id', authenticateToken, ShipmentController.getShipmentById);

// Récupérer une expédition par numéro de suivi
router.get('/tracking/:trackingNumber', authenticateToken, ShipmentController.getShipmentByTrackingNumber);

// Mettre à jour une expédition
router.put('/:id', authenticateToken, ShipmentController.updateShipment);

// Mettre à jour le statut d'une expédition
router.patch('/:id/status', authenticateToken, ShipmentController.updateShipmentStatus);

// Supprimer une expédition
router.delete('/:id', authenticateToken, ShipmentController.deleteShipment);

// Rechercher des expéditions
router.get('/search', authenticateToken, ShipmentController.searchShipments);

// Obtenir les statistiques des expéditions
router.get('/statistics', authenticateToken, ShipmentController.getShipmentStatistics);

module.exports = router;