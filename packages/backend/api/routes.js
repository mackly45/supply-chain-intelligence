const express = require('express');
const router = express.Router();

// Route de base
router.get('/', (req, res) => {
  res.json({ message: 'API Supply Chain Intelligence' });
});

// Routes pour les entrepôts
router.get('/warehouses', (req, res) => {
  res.json({ message: 'Liste des entrepôts' });
});

router.get('/warehouses/:id', (req, res) => {
  res.json({ message: `Détails de l'entrepôt ${req.params.id}` });
});

// Routes pour les produits
router.get('/products', (req, res) => {
  res.json({ message: 'Liste des produits' });
});

router.get('/products/:id', (req, res) => {
  res.json({ message: `Détails du produit ${req.params.id}` });
});

// Routes pour les stocks
router.get('/inventory', (req, res) => {
  res.json({ message: 'Liste des stocks' });
});

router.get('/inventory/:id', (req, res) => {
  res.json({ message: `Détails du stock ${req.params.id}` });
});

// Routes pour les expéditions
router.get('/shipments', (req, res) => {
  res.json({ message: 'Liste des expéditions' });
});

router.get('/shipments/:id', (req, res) => {
  res.json({ message: `Détails de l'expédition ${req.params.id}` });
});

// Routes pour les véhicules
router.get('/vehicles', (req, res) => {
  res.json({ message: 'Liste des véhicules' });
});

router.get('/vehicles/:id', (req, res) => {
  res.json({ message: `Détails du véhicule ${req.params.id}` });
});

// Routes pour les chauffeurs
router.get('/drivers', (req, res) => {
  res.json({ message: 'Liste des chauffeurs' });
});

router.get('/drivers/:id', (req, res) => {
  res.json({ message: `Détails du chauffeur ${req.params.id}` });
});

module.exports = router;