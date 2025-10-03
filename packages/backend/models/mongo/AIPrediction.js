// Modèle Prédiction d'IA pour MongoDB
const mongoose = require('mongoose');

const AIPredictionSchema = new mongoose.Schema({
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIModel',
    required: true,
  },
  inputData: mongoose.Schema.Types.Mixed,
  prediction: mongoose.Schema.Types.Mixed,
  confidence: {
    type: Number,
    min: 0,
    max: 1,
  },
  actualResult: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Indexation
AIPredictionSchema.index({ modelId: 1, timestamp: 1 });

module.exports = mongoose.model('AIPrediction', AIPredictionSchema);