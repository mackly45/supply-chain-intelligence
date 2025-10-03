#!/bin/bash
# Redis setup script for supply chain intelligence platform

# Configuration de Redis pour la gestion de cache
redis-cli <<EOF
# Configuration des clés d'expiration pour différents types de données
CONFIG SET maxmemory 256mb
CONFIG SET maxmemory-policy allkeys-lru

# Création des espaces de noms (prefixes) pour différentes fonctionnalités
# Ces commandes sont à titre indicatif car Redis ne supporte pas nativement les espaces de noms

# Configuration des clés de session utilisateur (expire après 1 heure)
# SET session:user:<user_id> "<session_data>" EX 3600

# Configuration des clés de cache pour les données de produits (expire après 30 minutes)
# SET cache:product:<product_id> "<product_data>" EX 1800

# Configuration des clés de cache pour les données d'inventaire (expire après 10 minutes)
# SET cache:inventory:<warehouse_id>:<product_id> "<inventory_data>" EX 600

# Configuration des clés de cache pour les positions des véhicules (expire après 5 minutes)
# SET cache:vehicle_position:<vehicle_id> "<position_data>" EX 300

# Configuration des clés de cache pour les prédictions d'IA (expire après 1 heure)
# SET cache:ai_prediction:<model_id>:<input_hash> "<prediction_data>" EX 3600

# Création de sets pour le regroupement de données
# SADD cache:product_categories "<category_id_1>"
# SADD cache:product_categories "<category_id_2>"

# Création de listes pour les files d'attente
# LPUSH queue:inventory_updates "<update_data>"
# LPUSH queue:shipment_notifications "<notification_data>"

# Configuration des compteurs
SET counter:total_shipments 0
SET counter:total_orders 0
SET counter:total_products 0

# Configuration des verrous distribués
# SET lock:inventory_update:<warehouse_id>:<product_id> "locked" EX 30 NX

# Configuration des données de configuration
HSET config:app name "Supply Chain Intelligence"
HSET config:app version "1.0.0"
HSET config:cache default_ttl 1800
HSET config:cache product_ttl 1800
HSET config:cache inventory_ttl 600
HSET config:cache vehicle_position_ttl 300

# Création des clés de monitoring
SET monitoring:last_cache_hit "$(date +%s)"
SET monitoring:last_cache_miss "$(date +%s)"
SET monitoring:active_sessions 0

EOF

echo "Redis configuration completed"