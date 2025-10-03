// Initialisation et association des modèles PostgreSQL
const { getPostgresIADatabase } = require('../config/sequelize.config');

// Importer tous les modèles
const User = require('./pg/User');
const Warehouse = require('./pg/Warehouse');
const ProductCategory = require('./pg/ProductCategory');
const Supplier = require('./pg/Supplier');
const Product = require('./pg/Product');
const Inventory = require('./pg/Inventory');
const InventoryMovement = require('./pg/InventoryMovement');
const Customer = require('./pg/Customer');
const CustomerOrder = require('./pg/CustomerOrder');
const CustomerOrderLine = require('./pg/CustomerOrderLine');
const PurchaseOrder = require('./pg/PurchaseOrder');
const PurchaseOrderLine = require('./pg/PurchaseOrderLine');
const Vehicle = require('./pg/Vehicle');
const Driver = require('./pg/Driver');
const Shipment = require('./pg/Shipment');
const VehiclePosition = require('./pg/VehiclePosition');
const Alert = require('./pg/Alert');
const AIModel = require('./pg/AIModel');
const AIPrediction = require('./pg/AIPrediction');
const SystemSetting = require('./pg/SystemSetting');

// Obtenir l'instance de la base de données
const sequelize = getPostgresIADatabase();

// Initialiser les modèles
const models = {
  User: User(sequelize),
  Warehouse: Warehouse(sequelize),
  ProductCategory: ProductCategory(sequelize),
  Supplier: Supplier(sequelize),
  Product: Product(sequelize),
  Inventory: Inventory(sequelize),
  InventoryMovement: InventoryMovement(sequelize),
  Customer: Customer(sequelize),
  CustomerOrder: CustomerOrder(sequelize),
  CustomerOrderLine: CustomerOrderLine(sequelize),
  PurchaseOrder: PurchaseOrder(sequelize),
  PurchaseOrderLine: PurchaseOrderLine(sequelize),
  Vehicle: Vehicle(sequelize),
  Driver: Driver(sequelize),
  Shipment: Shipment(sequelize),
  VehiclePosition: VehiclePosition(sequelize),
  Alert: Alert(sequelize),
  AIModel: AIModel(sequelize),
  AIPrediction: AIPrediction(sequelize),
  SystemSetting: SystemSetting(sequelize),
};

// Définir les associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Définir les associations spécifiques
// User associations
models.User.hasMany(models.Warehouse, { foreignKey: 'manager_id' });
models.User.hasMany(models.InventoryMovement, { foreignKey: 'created_by' });
models.User.hasMany(models.CustomerOrder, { foreignKey: 'created_by' });
models.User.hasMany(models.PurchaseOrder, { foreignKey: 'created_by' });
models.User.hasMany(models.Shipment, { foreignKey: 'created_by' });
models.User.hasMany(models.Alert, { foreignKey: 'resolved_by' });

// Warehouse associations
models.Warehouse.belongsTo(models.User, { foreignKey: 'manager_id' });
models.Warehouse.hasMany(models.Inventory, { foreignKey: 'warehouse_id' });
models.Warehouse.hasMany(models.Shipment, { foreignKey: 'origin_warehouse_id', as: 'origin_shipments' });
models.Warehouse.hasMany(models.Shipment, { foreignKey: 'destination_warehouse_id', as: 'destination_shipments' });

// ProductCategory associations
models.ProductCategory.hasMany(models.Product, { foreignKey: 'category_id' });
models.ProductCategory.belongsTo(models.ProductCategory, { foreignKey: 'parent_category_id', as: 'parent' });
models.ProductCategory.hasMany(models.ProductCategory, { foreignKey: 'parent_category_id', as: 'children' });

// Supplier associations
models.Supplier.hasMany(models.Product, { foreignKey: 'supplier_id' });
models.Supplier.hasMany(models.PurchaseOrder, { foreignKey: 'supplier_id' });

// Product associations
models.Product.belongsTo(models.ProductCategory, { foreignKey: 'category_id' });
models.Product.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
models.Product.hasMany(models.Inventory, { foreignKey: 'product_id' });
models.Product.hasMany(models.CustomerOrderLine, { foreignKey: 'product_id' });
models.Product.hasMany(models.PurchaseOrderLine, { foreignKey: 'product_id' });

// Inventory associations
models.Inventory.belongsTo(models.Warehouse, { foreignKey: 'warehouse_id' });
models.Inventory.belongsTo(models.Product, { foreignKey: 'product_id' });
models.Inventory.hasMany(models.InventoryMovement, { foreignKey: 'inventory_id' });

// InventoryMovement associations
models.InventoryMovement.belongsTo(models.Inventory, { foreignKey: 'inventory_id' });
models.InventoryMovement.belongsTo(models.User, { foreignKey: 'created_by' });

// Customer associations
models.Customer.hasMany(models.CustomerOrder, { foreignKey: 'customer_id' });

// CustomerOrder associations
models.CustomerOrder.belongsTo(models.Customer, { foreignKey: 'customer_id' });
models.CustomerOrder.belongsTo(models.User, { foreignKey: 'created_by' });
models.CustomerOrder.hasMany(models.CustomerOrderLine, { foreignKey: 'order_id' });
models.CustomerOrder.hasOne(models.Shipment, { foreignKey: 'customer_order_id' });

// CustomerOrderLine associations
models.CustomerOrderLine.belongsTo(models.CustomerOrder, { foreignKey: 'order_id' });
models.CustomerOrderLine.belongsTo(models.Product, { foreignKey: 'product_id' });

// PurchaseOrder associations
models.PurchaseOrder.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
models.PurchaseOrder.belongsTo(models.User, { foreignKey: 'created_by' });
models.PurchaseOrder.hasMany(models.PurchaseOrderLine, { foreignKey: 'purchase_order_id' });

// PurchaseOrderLine associations
models.PurchaseOrderLine.belongsTo(models.PurchaseOrder, { foreignKey: 'purchase_order_id' });
models.PurchaseOrderLine.belongsTo(models.Product, { foreignKey: 'product_id' });

// Vehicle associations
models.Vehicle.hasMany(models.Shipment, { foreignKey: 'vehicle_id' });
models.Vehicle.hasMany(models.VehiclePosition, { foreignKey: 'vehicle_id' });

// Driver associations
models.Driver.hasMany(models.Shipment, { foreignKey: 'driver_id' });

// Shipment associations
models.Shipment.belongsTo(models.Warehouse, { foreignKey: 'origin_warehouse_id', as: 'origin_warehouse' });
models.Shipment.belongsTo(models.Warehouse, { foreignKey: 'destination_warehouse_id', as: 'destination_warehouse' });
models.Shipment.belongsTo(models.CustomerOrder, { foreignKey: 'customer_order_id' });
models.Shipment.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
models.Shipment.belongsTo(models.Driver, { foreignKey: 'driver_id' });
models.Shipment.belongsTo(models.User, { foreignKey: 'created_by' });

// VehiclePosition associations
models.VehiclePosition.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });

// Alert associations
models.Alert.belongsTo(models.User, { foreignKey: 'resolved_by' });

// AIModel associations
models.AIModel.hasMany(models.AIPrediction, { foreignKey: 'model_id' });

// AIPrediction associations
models.AIPrediction.belongsTo(models.AIModel, { foreignKey: 'model_id' });

// Exporter les modèles et la connexion
module.exports = {
  ...models,
  sequelize,
  Sequelize: require('sequelize'),
};