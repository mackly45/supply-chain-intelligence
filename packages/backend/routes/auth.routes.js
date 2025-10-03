// Routes d'authentification
const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Inscription
router.post('/register', AuthController.register);

// Connexion
router.post('/login', AuthController.login);

// Récupérer le profil utilisateur (nécessite une authentification)
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;