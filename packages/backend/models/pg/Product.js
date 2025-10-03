// Modèle Produit pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sku: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    ean: {
      type: DataTypes.STRING(13),
    },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: 'product_categories',
        key: 'id',
      },
    },
    supplier_id: {
      type: DataTypes.UUID,
      references: {
        model: 'suppliers',
        key: 'id',
      },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    weight: {
      type: DataTypes.DECIMAL(8, 3),
    },
    dimensions: {
      type: DataTypes.JSONB,
    },
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Product;