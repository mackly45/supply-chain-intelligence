// Service d'authentification
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  // Inscription d'un nouvel utilisateur
  async register(userData) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({
        where: {
          [User.sequelize.Op.or]: [
            { email: userData.email },
            { username: userData.username }
          ]
        }
      });

      if (existingUser) {
        throw new Error('Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà');
      }

      // Hasher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Créer l'utilisateur
      const user = await User.create({
        ...userData,
        password_hash: hashedPassword
      });

      // Générer le token JWT
      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token
      };
    } catch (error) {
      throw new Error(`Erreur lors de l'inscription: ${error.message}`);
    }
  }

  // Connexion de l'utilisateur
  async login(email, password) {
    try {
      // Trouver l'utilisateur par email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Mettre à jour la dernière connexion
      await user.update({ last_login: new Date() });

      // Générer le token JWT
      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token
      };
    } catch (error) {
      throw new Error(`Erreur lors de la connexion: ${error.message}`);
    }
  }

  // Générer un token JWT
  generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'supply_chain_secret_key',
      { expiresIn: '24h' }
    );
  }

  // Vérifier un token JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'supply_chain_secret_key');
    } catch (error) {
      throw new Error('Token invalide');
    }
  }

  // Récupérer l'utilisateur par token
  async getUserByToken(token) {
    try {
      const decoded = this.verifyToken(token);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
    }
  }
}

module.exports = new AuthService();