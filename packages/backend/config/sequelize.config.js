// Configuration Sequelize pour les bases de données PostgreSQL
const { Sequelize } = require('sequelize');

// Configuration PostgreSQL principale
const postgresSequelize = new Sequelize(
  process.env.POSTGRES_DB || 'supply_chain_db',
  process.env.POSTGRES_USER || 'supply_chain_user',
  process.env.POSTGRES_PASSWORD || 'supply_chain_password',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Configuration PostgreSQL IA
const postgresIASequelize = new Sequelize(
  process.env.POSTGRES_IA_DB || 'IA_supply',
  process.env.POSTGRES_IA_USER || 'ia_user',
  process.env.POSTGRES_IA_PASSWORD || 'ia_password',
  {
    host: process.env.POSTGRES_IA_HOST || 'localhost',
    port: process.env.POSTGRES_IA_PORT || 5433,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Fonctions pour obtenir les instances de base de données
const getPostgresDatabase = () => postgresSequelize;
const getPostgresIADatabase = () => postgresIASequelize;

// Fonctions pour tester les connexions
const testPostgresConnection = async () => {
  try {
    await postgresSequelize.authenticate();
    console.log('Connexion PostgreSQL principale établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à PostgreSQL principal:', error);
  }
};

const testPostgresIAConnection = async () => {
  try {
    await postgresIASequelize.authenticate();
    console.log('Connexion PostgreSQL IA établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à PostgreSQL IA:', error);
  }
};

module.exports = {
  postgresSequelize,
  postgresIASequelize,
  getPostgresDatabase,
  getPostgresIADatabase,
  testPostgresConnection,
  testPostgresIAConnection,
};