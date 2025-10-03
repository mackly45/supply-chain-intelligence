# Database Configuration

This directory contains all the database initialization scripts and configurations for the Supply Chain Intelligence platform.

## Database Structure

### PostgreSQL (Main Database) - supply_chain_db
- **Port**: 5432
- **Username**: supply_chain_user
- **Password**: supply_chain_password
- **Database**: supply_chain_db
- **Purpose**: Main operational database for core supply chain operations

### PostgreSQL (AI Database) - IA_supply
- **Port**: 5433
- **Username**: ia_user
- **Password**: ia_password
- **Database**: IA_supply
- **Purpose**: Specialized database for AI/ML operations and analytics

### MongoDB - supply-IA
- **Port**: 27017
- **Username**: supply_chain_user
- **Password**: supply_chain_password
- **Database**: supply-IA
- **Purpose**: NoSQL storage for flexible data models and AI predictions

### ClickHouse
- **HTTP Port**: 8123
- **TCP Port**: 9000
- **Purpose**: Analytical database for real-time data analysis and reporting

### Redis
- **Port**: 6379
- **Purpose**: Caching layer and session management

## Initialization Scripts

1. **01-create-postgis-extension.sql** - Creates PostGIS extension for geospatial data
2. **02-create-tables.sql** - Creates core tables for the main PostgreSQL database
3. **03-clickhouse-schema.sql** - Creates schema for ClickHouse analytics
4. **04-mongodb-setup.js** - Sets up collections and validation for MongoDB
5. **05-postgresql-ia_supply.sql** - Creates complete schema for the IA_supply database
6. **06-redis-setup.sh** - Configures Redis for caching and session management

## Database Schema Overview

### IA_supply Database (PostgreSQL)

#### Core Entities
- **users** - System users with roles and permissions
- **warehouses** - Storage facilities with geospatial locations
- **product_categories** - Hierarchical product categorization
- **suppliers** - Product suppliers and vendor information
- **products** - Product catalog with detailed specifications
- **inventory** - Stock levels across warehouses
- **inventory_movements** - Stock movement history and tracking
- **customers** - Customer information and contacts
- **customer_orders** - Customer orders with status tracking
- **customer_order_lines** - Individual items within customer orders
- **purchase_orders** - Purchase orders to suppliers
- **purchase_order_lines** - Individual items within purchase orders
- **vehicles** - Transportation assets with specifications
- **drivers** - Driver information and licensing
- **shipments** - Shipment tracking and logistics
- **vehicle_positions** - Real-time GPS tracking data
- **alerts** - System notifications and warnings
- **ai_models** - AI/ML model registry and metadata
- **ai_predictions** - AI prediction results and validation
- **system_settings** - Application configuration parameters

#### Key Features
- Full geospatial support with PostGIS
- UUID primary keys for distributed systems
- Comprehensive audit trails with created_at/updated_at timestamps
- Automatic timestamp updates via triggers
- Extensive indexing for performance optimization
- Data integrity through foreign key constraints
- Flexible JSONB fields for dynamic attributes

### supply-IA Database (MongoDB)

#### Collections
- **products** - Product catalog with flexible schema
- **warehouses** - Warehouse information with geospatial data
- **inventory** - Stock levels and reservations
- **shipments** - Shipment tracking and logistics
- **vehiclePositions** - Real-time GPS tracking
- **aiModels** - AI/ML model registry
- **aiPredictions** - AI prediction results

#### Key Features
- Schema validation for data consistency
- Geospatial indexing for location queries
- Automatic indexing for performance
- Flexible document structure for evolving requirements

### ClickHouse Analytics

#### Tables
- **inventory_events** - Stock movement analytics
- **vehicle_positions** - Vehicle tracking analytics
- **logistics_kpis** - Key performance indicators

### Redis Caching

#### Configuration
- Memory-limited with LRU eviction policy
- Namespaced keys for organized caching
- Session management with expiration
- Distributed locking mechanisms
- Performance monitoring counters

## Usage Instructions

1. Ensure Docker and Docker Compose are installed
2. Run `docker-compose up` from the project root
3. Databases will be automatically initialized with the scripts in this directory
4. Access databases using the credentials specified above

## Connection Strings

- **PostgreSQL (Main)**: `postgresql://supply_chain_user:supply_chain_password@localhost:5432/supply_chain_db`
- **PostgreSQL (AI)**: `postgresql://ia_user:ia_password@localhost:5433/IA_supply`
- **MongoDB**: `mongodb://supply_chain_user:supply_chain_password@localhost:27017/supply-IA`
- **ClickHouse**: `http://localhost:8123`
- **Redis**: `redis://localhost:6379`