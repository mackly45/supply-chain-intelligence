// Routes des produits
const express = require('express');
const ProductController = require('../controllers/product.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Créer un produit (ADMIN seulement)
router.post('/', authenticateToken, authorizeRole(['ADMIN']), ProductController.createProduct);

// Récupérer tous les produits
router.get('/', authenticateToken, ProductController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', authenticateToken, ProductController.getProductById);

// Mettre à jour un produit (ADMIN seulement)
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), ProductController.updateProduct);

// Supprimer un produit (ADMIN seulement)
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), ProductController.deleteProduct);

// Rechercher des produits
router.get('/search', authenticateToken, ProductController.searchProducts);

module.exports = router;