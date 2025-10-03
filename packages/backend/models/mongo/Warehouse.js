// Modèle Entrepôt pour MongoDB
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  capacity: Number,
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

// Indexation géospatiale
WarehouseSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Warehouse', WarehouseSchema);