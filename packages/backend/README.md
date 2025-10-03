# Backend Supply Chain Intelligence

## Description
Backend complet pour la plateforme Supply Chain & Logistique Intelligente, avec toutes les fonctionnalités connectées directement aux bases de données.

## Fonctionnalités

### Authentification et Gestion des Utilisateurs
- Inscription et connexion sécurisées
- Gestion des rôles (ADMIN, MANAGER, USER)
- Protection des routes par JWT
- Profils utilisateurs

### Gestion des Entrepôts
- CRUD complet des entrepôts
- Géolocalisation avec PostGIS
- Attribution de managers
- Recherche par localisation

### Gestion des Produits
- Catalogue de produits complet
- Catégorisation hiérarchique
- Gestion des fournisseurs
- Recherche et filtrage avancé

### Gestion d'Inventaire
- Niveaux de stock en temps réel
- Mouvements d'inventaire (entrées/sorties)
- Réservation de stock
- Alertes de stock bas
- Historique des mouvements

### Gestion des Expéditions
- Suivi des colis avec numéro de tracking
- Gestion des statuts (EN ATTENTE, EN TRANSIT, LIVRÉ, ANNULÉ)
- Association avec commandes clients
- Gestion des véhicules et chauffeurs

### Suivi des Véhicules
- Tracking GPS en temps réel
- Historique des positions
- Calcul de vitesse moyenne
- Commandes à distance (via MQTT)
- Statistiques de suivi

### Intelligence Artificielle
- Gestion des modèles d'IA
- Prédiction de demande
- Classification de produits
- Clustering de clients
- Détection d'anomalies
- Validation des prédictions

### Notifications et Communication
- Notifications en temps réel (Socket.IO)
- Alertes système
- Communication véhicule-backend

## Architecture

### Technologies
- **Node.js** avec Express.js
- **PostgreSQL** (2 instances) pour données relationnelles
- **MongoDB** pour données flexibles et prédictions IA
- **Redis** pour caching et sessions
- **ClickHouse** pour analytics
- **Socket.IO** pour communications en temps réel
- **MQTT** pour communication avec les véhicules

### Structure du Projet
```
backend/
├── config/              # Configuration des bases de données
├── controllers/         # Contrôleurs des routes API
├── middleware/          # Middleware d'authentification
├── models/              # Modèles de données (PostgreSQL et MongoDB)
├── routes/              # Définition des routes API
├── services/            # Logique métier
├── utils/               # Fonctions utilitaires
├── scripts/             # Scripts d'automatisation
└── tests/               # Tests unitaires et d'intégration
```

### Bases de Données

#### PostgreSQL - supply_chain_db (Port 5432)
Base de données principale pour les opérations de chaîne d'approvisionnement

#### PostgreSQL - IA_supply (Port 5433)
Base de données spécialisée pour les opérations d'intelligence artificielle

#### MongoDB - supply-IA (Port 27017)
Base de données NoSQL pour le stockage flexible de données et prédictions d'IA

#### Redis (Port 6379)
Cache et gestion de sessions

#### ClickHouse (Ports 8123/9000)
Base de données analytique pour l'analyse en temps réel

## API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `GET /api/v1/auth/profile` - Profil utilisateur

### Entrepôts
- `POST /api/v1/warehouses` - Créer un entrepôt
- `GET /api/v1/warehouses` - Liste des entrepôts
- `GET /api/v1/warehouses/:id` - Détails d'un entrepôt
- `PUT /api/v1/warehouses/:id` - Mettre à jour un entrepôt
- `DELETE /api/v1/warehouses/:id` - Supprimer un entrepôt
- `GET /api/v1/warehouses/search/location` - Recherche par localisation

### Produits
- `POST /api/v1/products` - Créer un produit
- `GET /api/v1/products` - Liste des produits
- `GET /api/v1/products/:id` - Détails d'un produit
- `PUT /api/v1/products/:id` - Mettre à jour un produit
- `DELETE /api/v1/products/:id` - Supprimer un produit
- `GET /api/v1/products/search` - Rechercher des produits

### Inventaire
- `POST /api/v1/inventory` - Créer/mettre à jour l'inventaire
- `GET /api/v1/inventory` - Liste des niveaux d'inventaire
- `GET /api/v1/inventory/:id` - Détails d'un niveau d'inventaire
- `POST /api/v1/inventory/:warehouseId/:productId/update` - Mettre à jour les quantités
- `POST /api/v1/inventory/:warehouseId/:productId/reserve` - Réserver de l'inventaire
- `POST /api/v1/inventory/:warehouseId/:productId/release` - Libérer de l'inventaire
- `GET /api/v1/inventory/:inventoryId/movements` - Mouvements d'inventaire
- `GET /api/v1/inventory/alerts/low-stock` - Alertes de stock bas

### Expéditions
- `POST /api/v1/shipments` - Créer une expédition
- `GET /api/v1/shipments` - Liste des expéditions
- `GET /api/v1/shipments/:id` - Détails d'une expédition
- `GET /api/v1/shipments/tracking/:trackingNumber` - Suivi par numéro
- `PUT /api/v1/shipments/:id` - Mettre à jour une expédition
- `PATCH /api/v1/shipments/:id/status` - Mettre à jour le statut
- `DELETE /api/v1/shipments/:id` - Supprimer une expédition
- `GET /api/v1/shipments/search` - Rechercher des expéditions
- `GET /api/v1/shipments/statistics` - Statistiques

### Suivi des Véhicules
- `POST /api/v1/vehicle-tracking/:vehicleId/position` - Mettre à jour position
- `GET /api/v1/vehicle-tracking/:vehicleId/position` - Position actuelle
- `GET /api/v1/vehicle-tracking/:vehicleId/positions/history` - Historique positions
- `GET /api/v1/vehicle-tracking/positions/recent` - Positions récentes
- `GET /api/v1/vehicle-tracking/:vehicleId/speed/average` - Vitesse moyenne
- `POST /api/v1/vehicle-tracking/:vehicleId/command` - Envoyer commande
- `GET /api/v1/vehicle-tracking/statistics` - Statistiques

### Intelligence Artificielle
- `POST /api/v1/ai` - Créer un modèle
- `GET /api/v1/ai` - Liste des modèles
- `GET /api/v1/ai/:id` - Détails d'un modèle
- `PUT /api/v1/ai/:id` - Mettre à jour un modèle
- `DELETE /api/v1/ai/:id` - Supprimer un modèle
- `POST /api/v1/ai/:modelId/predict` - Faire une prédiction
- `GET /api/v1/ai/:modelId/predictions` - Liste des prédictions
- `POST /api/v1/ai/predictions/:predictionId/validate` - Valider prédiction
- `GET /api/v1/ai/statistics` - Statistiques des modèles
- `GET /api/v1/ai/:modelId/accuracy` - Précision du modèle

## Installation

### Prérequis
- Node.js (v16 ou supérieur)
- PostgreSQL (2 instances)
- MongoDB
- Redis
- ClickHouse
- Docker (recommandé)

### Installation des dépendances
```bash
cd packages/backend
npm install
```

### Configuration
1. Copier `.env.example` en `.env`
2. Configurer les variables d'environnement
3. Démarrer les bases de données (via docker-compose depuis la racine)

### Démarrage
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Tests
```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test:coverage
```

## Déploiement
Le backend peut être déployé avec Docker en utilisant le Dockerfile fourni.

## Contribution
Ce projet est open source sous licence MIT. Les contributions sont les bienvenues !

## Licence
MIT