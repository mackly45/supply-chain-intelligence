// Modèle Commande Fournisseur pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const PurchaseOrder = (sequelize) => {
  return sequelize.define('PurchaseOrder', {
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
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'suppliers',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'CONFIRMED', 'RECEIVED', 'CANCELLED']],
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
    tableName: 'purchase_orders',
    timestamps: true,
    underscored: true,
  });
};

module.exports = PurchaseOrder;