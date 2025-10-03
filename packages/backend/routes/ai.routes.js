// Routes d'intelligence artificielle
const express = require('express');
const AIController = require('../controllers/ai.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Créer un modèle d'IA (ADMIN seulement)
router.post('/', authenticateToken, authorizeRole(['ADMIN']), AIController.createModel);

// Récupérer tous les modèles
router.get('/', authenticateToken, AIController.getAllModels);

// Récupérer un modèle par ID
router.get('/:id', authenticateToken, AIController.getModelById);

// Mettre à jour un modèle (ADMIN seulement)
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), AIController.updateModel);

// Supprimer un modèle (ADMIN seulement)
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), AIController.deleteModel);

// Exécuter une prédiction avec un modèle
router.post('/:modelId/predict', authenticateToken, AIController.makePrediction);

// Récupérer les prédictions d'un modèle
router.get('/:modelId/predictions', authenticateToken, AIController.getModelPredictions);

// Valider une prédiction avec le résultat réel
router.post('/predictions/:predictionId/validate', authenticateToken, AIController.validatePrediction);

// Obtenir les statistiques des modèles
router.get('/statistics', authenticateToken, AIController.getModelStatistics);

// Calculer la précision moyenne des modèles
router.get('/:modelId/accuracy', authenticateToken, AIController.calculateModelAccuracy);

module.exports = router;