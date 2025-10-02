// Importer les dépendances
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configuration de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME || 'supply_chain_db',
  process.env.DB_USER || 'supply_chain_user',
  process.env.DB_PASSWORD || 'supply_chain_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false // Désactiver le logging en production
  }
);

// Authentifier et synchroniser la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Exporter l'instance de sequelize
module.exports = { sequelize };