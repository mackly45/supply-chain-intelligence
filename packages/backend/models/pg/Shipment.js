// Modèle Expédition pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Shipment = (sequelize) => {
  return sequelize.define('Shipment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tracking_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']],
      },
    },
    origin_warehouse_id: {
      type: DataTypes.UUID,
      references: {
        model: 'warehouses',
        key: 'id',
      },
    },
    destination_warehouse_id: {
      type: DataTypes.UUID,
      references: {
        model: 'warehouses',
        key: 'id',
      },
    },
    customer_order_id: {
      type: DataTypes.UUID,
      references: {
        model: 'customer_orders',
        key: 'id',
      },
    },
    vehicle_id: {
      type: DataTypes.UUID,
      references: {
        model: 'vehicles',
        key: 'id',
      },
    },
    driver_id: {
      type: DataTypes.UUID,
      references: {
        model: 'drivers',
        key: 'id',
      },
    },
    estimated_departure: {
      type: DataTypes.DATE,
    },
    actual_departure: {
      type: DataTypes.DATE,
    },
    estimated_arrival: {
      type: DataTypes.DATE,
    },
    actual_arrival: {
      type: DataTypes.DATE,
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    tableName: 'shipments',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Shipment;