const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();

// Créer le serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Importer le routeur API
const apiRouter = require('./routes/api');

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Supply Chain Intelligence Backend API' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Utiliser le routeur API
app.use('/api/v1', apiRouter);

// Middleware Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvelle connexion Socket.IO établie');

  socket.on('disconnect', () => {
    console.log('Connexion Socket.IO déconnectée');
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Middleware pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Initialiser les connexions aux bases de données
const { testPostgresConnection, testPostgresIAConnection } = require('./config/sequelize.config');
const { connectMongoDB } = require('./config/db.config');
const VehicleTrackingService = require('./services/vehicle-tracking.service');

// Tester les connexions aux bases de données au démarrage
const initializeDatabaseConnections = async () => {
  try {
    await testPostgresConnection();
    await testPostgresIAConnection();
    await connectMongoDB();
    console.log('Toutes les connexions aux bases de données sont établies');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des connexions aux bases de données:', error);
  }
};

// Initialiser MQTT pour le suivi des véhicules
const initializeVehicleTracking = async () => {
  try {
    await VehicleTrackingService.initMQTT();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du suivi des véhicules:', error);
  }
};

// Synchroniser les modèles Sequelize avec la base de données
const syncDatabaseModels = async () => {
  try {
    const { sequelize } = require('./models');
    await sequelize.sync({ alter: true }); // Utiliser { force: true } pour réinitialiser la base (à éviter en production)
    console.log('Modèles de base de données synchronisés');
  } catch (error) {
    console.error('Erreur lors de la synchronisation des modèles:', error);
  }
};

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  
  // Initialiser les connexions et services
  await initializeDatabaseConnections();
  await syncDatabaseModels();
  await initializeVehicleTracking();
});

module.exports = { app, server, io };