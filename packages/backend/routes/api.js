// Routeur API principal
const express = require('express');
const authRoutes = require('./auth.routes');
const warehouseRoutes = require('./warehouse.routes');
const productRoutes = require('./product.routes');
const inventoryRoutes = require('./inventory.routes');
const shipmentRoutes = require('./shipment.routes');
const vehicleTrackingRoutes = require('./vehicle-tracking.routes');
const aiRoutes = require('./ai.routes');

const router = express.Router();

// Routes d'authentification
router.use('/auth', authRoutes);

// Routes des entrepôts
router.use('/warehouses', warehouseRoutes);

// Routes des produits
router.use('/products', productRoutes);

// Routes d'inventaire
router.use('/inventory', inventoryRoutes);

// Routes des expéditions
router.use('/shipments', shipmentRoutes);

// Routes de suivi des véhicules
router.use('/vehicle-tracking', vehicleTrackingRoutes);

// Routes d'intelligence artificielle
router.use('/ai', aiRoutes);

// Route de test
router.get('/', (req, res) => {
  res.json({ 
    message: 'API Supply Chain Intelligence',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;