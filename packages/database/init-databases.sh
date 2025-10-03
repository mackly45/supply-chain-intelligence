#!/bin/bash
# Script d'initialisation complète des bases de données

echo "=== Initialisation des bases de données du projet Supply Chain Intelligence ==="

# Vérification des prérequis
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez installer Docker avant de continuer."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose n'est pas installé. Veuillez installer Docker Compose avant de continuer."
    exit 1
fi

echo "Docker et Docker Compose sont installés."

# Arrêt des services existants
echo "Arrêt des services Docker existants..."
docker-compose down

# Nettoyage des volumes existants (optionnel - décommentez si nécessaire)
# echo "Nettoyage des volumes Docker existants..."
# docker volume prune -f

# Démarrage des services
echo "Démarrage des services Docker..."
docker-compose up -d

# Attente de l'initialisation des bases de données
echo "Attente de l'initialisation des bases de données..."
sleep 30

# Vérification de l'état des services
echo "Vérification de l'état des services..."
docker-compose ps

# Vérification de PostgreSQL principal
echo "Vérification de PostgreSQL principal..."
docker-compose exec postgres pg_isready -U supply_chain_user
if [ $? -eq 0 ]; then
    echo "PostgreSQL principal: OK"
else
    echo "PostgreSQL principal: ERREUR"
fi

# Vérification de PostgreSQL IA
echo "Vérification de PostgreSQL IA..."
docker-compose exec postgres-ia pg_isready -U ia_user
if [ $? -eq 0 ]; then
    echo "PostgreSQL IA: OK"
else
    echo "PostgreSQL IA: ERREUR"
fi

# Vérification de MongoDB
echo "Vérification de MongoDB..."
docker-compose exec mongodb mongosh --eval "db.runCommand({ connectionStatus: 1 })" --quiet
if [ $? -eq 0 ]; then
    echo "MongoDB: OK"
else
    echo "MongoDB: ERREUR"
fi

# Vérification de Redis
echo "Vérification de Redis..."
docker-compose exec redis redis-cli ping
if [ $? -eq 0 ]; then
    echo "Redis: OK"
else
    echo "Redis: ERREUR"
fi

# Vérification de ClickHouse
echo "Vérification de ClickHouse..."
docker-compose exec clickhouse clickhouse-client --query "SELECT 1" --silent
if [ $? -eq 0 ]; then
    echo "ClickHouse: OK"
else
    echo "ClickHouse: ERREUR"
fi

# Affichage des bases de données créées
echo "=== Bases de données créées ==="
echo "1. PostgreSQL (supply_chain_db) - Port 5432"
echo "2. PostgreSQL (IA_supply) - Port 5433"
echo "3. MongoDB (supply-IA) - Port 27017"
echo "4. ClickHouse - Ports 8123/9000"
echo "5. Redis - Port 6379"

echo "=== Initialisation terminée ==="
echo "Vous pouvez maintenant accéder aux bases de données avec les identifiants spécifiés dans le README.md"