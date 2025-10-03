// Modèle Ligne de Commande Fournisseur pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const PurchaseOrderLine = (sequelize) => {
  return sequelize.define('PurchaseOrderLine', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    purchase_order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'purchase_orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    total_price: {
      type: DataTypes.DECIMAL(12, 2),
    },
    received_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'purchase_order_lines',
    timestamps: true,
    underscored: true,
  });
};

module.exports = PurchaseOrderLine;