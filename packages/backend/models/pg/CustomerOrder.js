// Modèle Commande Client pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const CustomerOrder = (sequelize) => {
  return sequelize.define('CustomerOrder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']],
      },
    },
    priority: {
      type: DataTypes.STRING(20),
      defaultValue: 'NORMAL',
      validate: {
        isIn: [['LOW', 'NORMAL', 'HIGH', 'URGENT']],
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'EUR',
    },
    expected_delivery_date: {
      type: DataTypes.DATE,
    },
    actual_delivery_date: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    tableName: 'customer_orders',
    timestamps: true,
    underscored: true,
  });
};

module.exports = CustomerOrder;