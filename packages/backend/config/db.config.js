// Configuration des connexions aux bases de données
const { Pool } = require('pg');
const mongoose = require('mongoose');
const redis = require('redis');
const { createClient } = require('@clickhouse/client');

// Configuration PostgreSQL principale
const postgresPool = new Pool({
  user: process.env.POSTGRES_USER || 'supply_chain_user',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'supply_chain_db',
  password: process.env.POSTGRES_PASSWORD || 'supply_chain_password',
  port: process.env.POSTGRES_PORT || 5432,
});

// Configuration PostgreSQL IA
const postgresIAPool = new Pool({
  user: process.env.POSTGRES_IA_USER || 'ia_user',
  host: process.env.POSTGRES_IA_HOST || 'localhost',
  database: process.env.POSTGRES_IA_DB || 'IA_supply',
  password: process.env.POSTGRES_IA_PASSWORD || 'ia_password',
  port: process.env.POSTGRES_IA_PORT || 5433,
});

// Configuration MongoDB
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb://supply_chain_user:supply_chain_password@localhost:27017/supply-IA',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

// Configuration Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connecté');
});

// Configuration ClickHouse
const clickhouseClient = createClient({
  host: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
  username: process.env.CLICKHOUSE_USER || 'default',
  password: process.env.CLICKHOUSE_PASSWORD || '',
});

module.exports = {
  postgresPool,
  postgresIAPool,
  connectMongoDB,
  redisClient,
  clickhouseClient,
};