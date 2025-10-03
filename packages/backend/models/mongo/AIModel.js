// Modèle Modèle d'IA pour MongoDB
const mongoose = require('mongoose');

const AIModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['PREDICTION', 'CLASSIFICATION', 'CLUSTERING', 'ANOMALY_DETECTION'],
    required: true,
  },
  description: String,
  filePath: String,
  accuracy: Number,
  trainingDataSize: Number,
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

// Indexation
AIModelSchema.index({ name: 1, version: 1 });

module.exports = mongoose.model('AIModel', AIModelSchema);