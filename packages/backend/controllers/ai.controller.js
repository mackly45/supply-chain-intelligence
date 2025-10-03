// Contrôleur d'intelligence artificielle
const AIService = require('../services/ai.service');

class AIController {
  // Créer un modèle d'IA
  async createModel(req, res) {
    try {
      const modelData = req.body;
      const model = await AIService.createModel(modelData);
      res.status(201).json(model);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer tous les modèles
  async getAllModels(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        name: req.query.name,
        type: req.query.type
      };

      const result = await AIService.getAllModels(page, limit, filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer un modèle par ID
  async getModelById(req, res) {
    try {
      const { id } = req.params;
      const model = await AIService.getModelById(id);
      res.json(model);
    } catch (error) {
      if (error.message === 'Modèle non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Mettre à jour un modèle
  async updateModel(req, res) {
    try {
      const { id } = req.params;
      const modelData = req.body;
      const model = await AIService.updateModel(id, modelData);
      res.json(model);
    } catch (error) {
      if (error.message === 'Modèle non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Supprimer un modèle
  async deleteModel(req, res) {
    try {
      const { id } = req.params;
      const result = await AIService.deleteModel(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Modèle non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Exécuter une prédiction avec un modèle
  async makePrediction(req, res) {
    try {
      const { modelId } = req.params;
      const inputData = req.body;
      
      const prediction = await AIService.makePrediction(modelId, inputData);
      res.json(prediction);
    } catch (error) {
      if (error.message === 'Modèle non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Récupérer les prédictions d'un modèle
  async getModelPredictions(req, res) {
    try {
      const { modelId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await AIService.getModelPredictions(modelId, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Valider une prédiction avec le résultat réel
  async validatePrediction(req, res) {
    try {
      const { predictionId } = req.params;
      const { actualResult } = req.body;
      
      const prediction = await AIService.validatePrediction(predictionId, actualResult);
      res.json(prediction);
    } catch (error) {
      if (error.message === 'Prédiction non trouvée') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Obtenir les statistiques des modèles
  async getModelStatistics(req, res) {
    try {
      const statistics = await AIService.getModelStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Calculer la précision moyenne des modèles
  async calculateModelAccuracy(req, res) {
    try {
      const { modelId } = req.params;
      const accuracy = await AIService.calculateModelAccuracy(modelId);
      res.json({ accuracy });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AIController();