// Modèle Inventaire pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Inventory = (sequelize) => {
  return sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id',
      },
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
      defaultValue: 0,
      allowNull: false,
    },
    reserved_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    reorder_level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    max_stock_level: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'inventory',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['warehouse_id', 'product_id'],
      },
    ],
  });
};

module.exports = Inventory;