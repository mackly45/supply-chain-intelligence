// Contrôleur d'authentification
const AuthService = require('../services/auth.service');

class AuthController {
  // Inscription
  async register(req, res) {
    try {
      const userData = req.body;
      const result = await AuthService.register(userData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Connexion
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  // Récupérer le profil utilisateur
  async getProfile(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
      }

      const user = await AuthService.getUserByToken(token);
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();