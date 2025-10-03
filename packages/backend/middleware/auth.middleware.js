// Middleware d'authentification et d'autorisation
const AuthService = require('../services/auth.service');

// Middleware pour vérifier le token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }

    const user = await AuthService.getUserByToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalide.' });
  }
};

// Middleware pour vérifier les rôles
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permission refusée.' });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};