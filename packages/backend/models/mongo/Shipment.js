// Modèle Expédition pour MongoDB
const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING',
  },
  originWarehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  destinationWarehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  estimatedDeparture: Date,
  actualDeparture: Date,
  estimatedArrival: Date,
  actualArrival: Date,
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

// Indexation
ShipmentSchema.index({ trackingNumber: 1 });
ShipmentSchema.index({ status: 1 });

module.exports = mongoose.model('Shipment', ShipmentSchema);