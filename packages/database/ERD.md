# Entity-Relationship Diagram (ERD)

## PostgreSQL - IA_supply Database

```mermaid
erDiagram
    users ||--o{ warehouses : manages
    users ||--o{ customer_orders : creates
    users ||--o{ purchase_orders : creates
    users ||--o{ shipments : creates
    users ||--o{ inventory_movements : performs
    users ||--o{ alerts : resolves
    
    warehouses ||--o{ inventory : contains
    warehouses ||--o{ shipments : origins
    warehouses ||--o{ shipments : destinations
    
    product_categories ||--o{ product_categories : parent
    product_categories ||--o{ products : categorizes
    
    suppliers ||--o{ products : supplies
    suppliers ||--o{ purchase_orders : provides
    
    products ||--o{ inventory : stored
    products ||--o{ customer_order_lines : ordered
    products ||--o{ purchase_order_lines : purchased
    
    inventory ||--o{ inventory_movements : tracks
    
    customers ||--o{ customer_orders : places
    
    customer_orders ||--o{ customer_order_lines : contains
    customer_orders ||--o{ shipments : fulfilled
    
    purchase_orders ||--o{ purchase_order_lines : contains
    
    vehicles ||--o{ shipments : transports
    vehicles ||--o{ vehicle_positions : tracked
    
    drivers ||--o{ shipments : drives
    
    ai_models ||--o{ ai_predictions : generates
    
    alerts }o--|| users : resolved_by

    users {
        UUID id PK
        VARCHAR username
        VARCHAR email
        VARCHAR password_hash
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR role
        BOOLEAN is_active
        TIMESTAMP last_login
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    warehouses {
        UUID id PK
        VARCHAR name
        GEOMETRY location
        TEXT address
        INTEGER capacity
        UUID manager_id FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    product_categories {
        UUID id PK
        VARCHAR name
        TEXT description
        UUID parent_category_id FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    suppliers {
        UUID id PK
        VARCHAR name
        VARCHAR contact_person
        VARCHAR email
        VARCHAR phone
        TEXT address
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    products {
        UUID id PK
        VARCHAR name
        TEXT description
        VARCHAR sku
        VARCHAR ean
        UUID category_id FK
        UUID supplier_id FK
        DECIMAL unit_price
        DECIMAL weight
        JSONB dimensions
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    inventory {
        UUID id PK
        UUID warehouse_id FK
        UUID product_id FK
        INTEGER quantity
        INTEGER reserved_quantity
        INTEGER reorder_level
        INTEGER max_stock_level
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    inventory_movements {
        UUID id PK
        UUID inventory_id FK
        VARCHAR movement_type
        INTEGER quantity
        VARCHAR reference_type
        UUID reference_id
        TEXT reason
        UUID created_by FK
        TIMESTAMP created_at
    }
    
    customers {
        UUID id PK
        VARCHAR name
        VARCHAR contact_person
        VARCHAR email
        VARCHAR phone
        TEXT address
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    customer_orders {
        UUID id PK
        VARCHAR order_number
        UUID customer_id FK
        VARCHAR status
        VARCHAR priority
        DECIMAL total_amount
        VARCHAR currency
        DATE expected_delivery_date
        DATE actual_delivery_date
        UUID created_by FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    customer_order_lines {
        UUID id PK
        UUID order_id FK
        UUID product_id FK
        INTEGER quantity
        DECIMAL unit_price
        DECIMAL total_price
        TIMESTAMP created_at
    }
    
    purchase_orders {
        UUID id PK
        VARCHAR order_number
        UUID supplier_id FK
        VARCHAR status
        DECIMAL total_amount
        VARCHAR currency
        DATE expected_delivery_date
        DATE actual_delivery_date
        UUID created_by FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    purchase_order_lines {
        UUID id PK
        UUID purchase_order_id FK
        UUID product_id FK
        INTEGER quantity
        DECIMAL unit_price
        DECIMAL total_price
        INTEGER received_quantity
        TIMESTAMP created_at
    }
    
    vehicles {
        UUID id PK
        VARCHAR registration_number
        VARCHAR vehicle_type
        INTEGER capacity
        VARCHAR fuel_type
        VARCHAR status
        DATE last_maintenance_date
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    drivers {
        UUID id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR license_number
        VARCHAR phone
        VARCHAR email
        DATE license_expiry_date
        BOOLEAN is_active
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    shipments {
        UUID id PK
        VARCHAR tracking_number
        VARCHAR status
        UUID origin_warehouse_id FK
        UUID destination_warehouse_id FK
        UUID customer_order_id FK
        UUID vehicle_id FK
        UUID driver_id FK
        TIMESTAMP estimated_departure
        TIMESTAMP actual_departure
        TIMESTAMP estimated_arrival
        TIMESTAMP actual_arrival
        DECIMAL shipping_cost
        UUID created_by FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    vehicle_positions {
        UUID id PK
        UUID vehicle_id FK
        DECIMAL latitude
        DECIMAL longitude
        DECIMAL speed
        DECIMAL heading
        TIMESTAMP timestamp
    }
    
    alerts {
        UUID id PK
        VARCHAR alert_type
        VARCHAR severity
        VARCHAR title
        TEXT description
        VARCHAR related_entity_type
        UUID related_entity_id
        BOOLEAN is_resolved
        UUID resolved_by FK
        TIMESTAMP resolved_at
        TIMESTAMP created_at
    }
    
    ai_models {
        UUID id PK
        VARCHAR name
        VARCHAR version
        VARCHAR type
        TEXT description
        VARCHAR file_path
        DECIMAL accuracy
        INTEGER training_data_size
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    ai_predictions {
        UUID id PK
        UUID model_id FK
        JSONB input_data
        JSONB prediction
        DECIMAL confidence
        JSONB actual_result
        TIMESTAMP created_at
    }
    
    system_settings {
        UUID id PK
        VARCHAR setting_key
        TEXT setting_value
        TEXT description
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
```

## MongoDB Collections

```mermaid
erDiagram
    products ||--o{ inventory : stored
    warehouses ||--o{ inventory : contains
    warehouses ||--o{ shipments : origins
    warehouses ||--o{ shipments : destinations
    vehicles ||--o{ vehiclePositions : tracked
    aiModels ||--o{ aiPredictions : generates

    products {
        ObjectId _id PK
        string name
        string description
        string sku
        string category
        number price
        object attributes
        date createdAt
        date updatedAt
    }
    
    warehouses {
        ObjectId _id PK
        string name
        object location
        string address
        number capacity
        date createdAt
        date updatedAt
    }
    
    inventory {
        ObjectId _id PK
        ObjectId warehouseId FK
        ObjectId productId FK
        number quantity
        number reservedQuantity
        date createdAt
        date updatedAt
    }
    
    shipments {
        ObjectId _id PK
        string trackingNumber
        string status
        ObjectId originWarehouseId FK
        ObjectId destinationWarehouseId FK
        ObjectId vehicleId FK
        ObjectId driverId FK
        date estimatedDeparture
        date actualDeparture
        date estimatedArrival
        date actualArrival
        date createdAt
        date updatedAt
    }
    
    vehiclePositions {
        ObjectId _id PK
        ObjectId vehicleId FK
        number latitude
        number longitude
        date timestamp
    }
    
    aiModels {
        ObjectId _id PK
        string name
        string version
        string type
        string description
        string filePath
        number accuracy
        number trainingDataSize
        date createdAt
        date updatedAt
    }
    
    aiPredictions {
        ObjectId _id PK
        ObjectId modelId FK
        object inputData
        object prediction
        number confidence
        object actualResult
        date timestamp
    }
```

## Key Relationships

### Core Supply Chain Flow

1. **Suppliers** provide **Products**
2. **Products** are stored in **Warehouses** as **Inventory**
3. **Customers** place **Customer Orders**
4. **Customer Orders** are fulfilled through **Shipments**
5. **Shipments** use **Vehicles** and **Drivers**
6. **Vehicle Positions** track transportation in real-time

### Inventory Management

1. **Inventory Movements** track all stock changes
2. **Purchase Orders** replenish stock from suppliers
3. **Alerts** notify of low stock or other issues

### AI/ML Integration

1. **AI Models** generate **AI Predictions**
2. **Predictions** can be validated against actual results
3. **Models** are used for demand forecasting, route optimization, etc.

### User Management

1. **Users** create and manage all entities
2. **Users** resolve **Alerts**
3. **Users** have different roles (ADMIN, MANAGER, USER)

This comprehensive database design supports all aspects of supply chain management with proper relationships, constraints, and indexing for optimal performance.