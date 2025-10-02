-- Schéma ClickHouse pour l'analytique

-- Table des événements de mouvement de stock
CREATE TABLE inventory_events (
    event_id UUID,
    product_id Int32,
    warehouse_id Int32,
    movement_type String,
    quantity Int32,
    timestamp DateTime
) ENGINE = MergeTree()
ORDER BY (timestamp);

-- Table des positions des véhicules
CREATE TABLE vehicle_positions (
    vehicle_id Int32,
    latitude Float64,
    longitude Float64,
    timestamp DateTime
) ENGINE = MergeTree()
ORDER BY (timestamp);

-- Table des KPI de logistique
CREATE TABLE logistics_kpis (
    date Date,
    warehouse_id Int32,
    total_shipments Int32,
    on_time_deliveries Int32,
    delayed_deliveries Int32,
    avg_delivery_time Float64, -- en heures
    total_inventory_value Float64
) ENGINE = MergeTree()
ORDER BY (date);