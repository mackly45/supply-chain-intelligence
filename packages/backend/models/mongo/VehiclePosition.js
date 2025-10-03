// Modèle Position de Véhicule pour MongoDB
const mongoose = require('mongoose');

const VehiclePositionSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Indexation
VehiclePositionSchema.index({ vehicleId: 1, timestamp: 1 });

module.exports = mongoose.model('VehiclePosition', VehiclePositionSchema);