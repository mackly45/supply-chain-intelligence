// MongoDB setup script for supply-IA database

// Use the supply-IA database
use supply-IA;

// Create collections with validation schemas

// Products collection
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "sku", "category", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Product name is required and must be a string"
        },
        description: {
          bsonType: "string",
          description: "Product description"
        },
        sku: {
          bsonType: "string",
          description: "SKU is required and must be a string"
        },
        category: {
          bsonType: "string",
          description: "Category is required and must be a string"
        },
        price: {
          bsonType: "number",
          description: "Product price"
        },
        attributes: {
          bsonType: "object",
          description: "Additional product attributes"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
});

// Warehouses collection
db.createCollection("warehouses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "location", "address", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Warehouse name is required"
        },
        location: {
          bsonType: "object",
          required: ["type", "coordinates"],
          properties: {
            type: {
              bsonType: "string",
              enum: ["Point"]
            },
            coordinates: {
              bsonType: "array",
              items: {
                bsonType: "number"
              },
              minItems: 2,
              maxItems: 2
            }
          }
        },
        address: {
          bsonType: "string",
          description: "Warehouse address is required"
        },
        capacity: {
          bsonType: "number",
          description: "Warehouse capacity in cubic meters"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
});

// Inventory collection
db.createCollection("inventory", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["warehouseId", "productId", "quantity", "createdAt"],
      properties: {
        warehouseId: {
          bsonType: "objectId",
          description: "Reference to warehouse is required"
        },
        productId: {
          bsonType: "objectId",
          description: "Reference to product is required"
        },
        quantity: {
          bsonType: "number",
          minimum: 0,
          description: "Current quantity is required"
        },
        reservedQuantity: {
          bsonType: "number",
          minimum: 0,
          description: "Reserved quantity"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
});

// Shipments collection
db.createCollection("shipments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["trackingNumber", "status", "originWarehouseId", "destinationWarehouseId", "createdAt"],
      properties: {
        trackingNumber: {
          bsonType: "string",
          description: "Tracking number is required"
        },
        status: {
          bsonType: "string",
          enum: ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"],
          description: "Shipment status is required"
        },
        originWarehouseId: {
          bsonType: "objectId",
          description: "Origin warehouse reference is required"
        },
        destinationWarehouseId: {
          bsonType: "objectId",
          description: "Destination warehouse reference is required"
        },
        vehicleId: {
          bsonType: "objectId",
          description: "Vehicle reference"
        },
        driverId: {
          bsonType: "objectId",
          description: "Driver reference"
        },
        estimatedDeparture: {
          bsonType: "date",
          description: "Estimated departure time"
        },
        actualDeparture: {
          bsonType: "date",
          description: "Actual departure time"
        },
        estimatedArrival: {
          bsonType: "date",
          description: "Estimated arrival time"
        },
        actualArrival: {
          bsonType: "date",
          description: "Actual arrival time"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
});

// Vehicle positions collection
db.createCollection("vehiclePositions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vehicleId", "latitude", "longitude", "timestamp"],
      properties: {
        vehicleId: {
          bsonType: "objectId",
          description: "Vehicle reference is required"
        },
        latitude: {
          bsonType: "number",
          minimum: -90,
          maximum: 90,
          description: "Latitude is required"
        },
        longitude: {
          bsonType: "number",
          minimum: -180,
          maximum: 180,
          description: "Longitude is required"
        },
        timestamp: {
          bsonType: "date",
          description: "Position timestamp is required"
        }
      }
    }
  }
});

// AI/ML Models collection
db.createCollection("aiModels", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "version", "type", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Model name is required"
        },
        version: {
          bsonType: "string",
          description: "Model version is required"
        },
        type: {
          bsonType: "string",
          enum: ["PREDICTION", "CLASSIFICATION", "CLUSTERING", "ANOMALY_DETECTION"],
          description: "Model type is required"
        },
        description: {
          bsonType: "string",
          description: "Model description"
        },
        filePath: {
          bsonType: "string",
          description: "Path to model file"
        },
        accuracy: {
          bsonType: "number",
          description: "Model accuracy metric"
        },
        trainingDataSize: {
          bsonType: "number",
          description: "Size of training dataset"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date is required"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
});

// AI Predictions collection
db.createCollection("aiPredictions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["modelId", "inputData", "prediction", "timestamp"],
      properties: {
        modelId: {
          bsonType: "objectId",
          description: "AI model reference is required"
        },
        inputData: {
          bsonType: "object",
          description: "Input data used for prediction"
        },
        prediction: {
          bsonType: "object",
          description: "Prediction result"
        },
        confidence: {
          bsonType: "number",
          minimum: 0,
          maximum: 1,
          description: "Prediction confidence score"
        },
        actualResult: {
          bsonType: "object",
          description: "Actual result (for model validation)"
        },
        timestamp: {
          bsonType: "date",
          description: "Prediction timestamp is required"
        }
      }
    }
  }
});

// Create indexes for better query performance
db.products.createIndex({ "sku": 1 }, { unique: true });
db.products.createIndex({ "category": 1 });
db.warehouses.createIndex({ "location": "2dsphere" });
db.inventory.createIndex({ "warehouseId": 1, "productId": 1 });
db.shipments.createIndex({ "trackingNumber": 1 }, { unique: true });
db.shipments.createIndex({ "status": 1 });
db.vehiclePositions.createIndex({ "vehicleId": 1, "timestamp": 1 });
db.aiModels.createIndex({ "name": 1, "version": 1 });
db.aiPredictions.createIndex({ "modelId": 1, "timestamp": 1 });