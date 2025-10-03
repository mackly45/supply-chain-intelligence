// Routes des entrepôts
const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Créer un entrepôt (ADMIN seulement)
router.post('/', authenticateToken, authorizeRole(['ADMIN']), WarehouseController.createWarehouse);

// Récupérer tous les entrepôts
router.get('/', authenticateToken, WarehouseController.getAllWarehouses);

// Récupérer un entrepôt par ID
router.get('/:id', authenticateToken, WarehouseController.getWarehouseById);

// Mettre à jour un entrepôt (ADMIN ou manager de l'entrepôt)
router.put('/:id', authenticateToken, WarehouseController.updateWarehouse);

// Supprimer un entrepôt (ADMIN seulement)
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), WarehouseController.deleteWarehouse);

// Rechercher des entrepôts par localisation
router.get('/search/location', authenticateToken, WarehouseController.searchWarehousesByLocation);

module.exports = router;