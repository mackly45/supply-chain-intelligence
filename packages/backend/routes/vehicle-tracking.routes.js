// Routes de suivi des véhicules
const express = require('express');
const VehicleTrackingController = require('../controllers/vehicle-tracking.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Mettre à jour la position d'un véhicule (peut être appelé par les véhicules eux-mêmes)
router.post('/:vehicleId/position', VehicleTrackingController.updateVehiclePosition);

// Récupérer la position actuelle d'un véhicule
router.get('/:vehicleId/position', authenticateToken, VehicleTrackingController.getVehicleCurrentPosition);

// Récupérer l'historique des positions d'un véhicule
router.get('/:vehicleId/positions/history', authenticateToken, VehicleTrackingController.getVehiclePositionHistory);

// Récupérer toutes les positions récentes
router.get('/positions/recent', authenticateToken, VehicleTrackingController.getAllRecentPositions);

// Calculer la vitesse moyenne d'un véhicule
router.get('/:vehicleId/speed/average', authenticateToken, VehicleTrackingController.calculateAverageSpeed);

// Envoyer une commande à un véhicule (ADMIN seulement)
router.post('/:vehicleId/command', authenticateToken, VehicleTrackingController.sendVehicleCommand);

// Obtenir les statistiques de suivi
router.get('/statistics', authenticateToken, VehicleTrackingController.getTrackingStatistics);

module.exports = router;