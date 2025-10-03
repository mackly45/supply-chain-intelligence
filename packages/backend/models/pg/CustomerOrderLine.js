// Modèle Ligne de Commande Client pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const CustomerOrderLine = (sequelize) => {
  return sequelize.define('CustomerOrderLine', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customer_orders',
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
  }, {
    tableName: 'customer_order_lines',
    timestamps: true,
    underscored: true,
  });
};

module.exports = CustomerOrderLine;