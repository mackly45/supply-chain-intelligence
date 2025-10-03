// Modèle Catégorie de Produit pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const ProductCategory = (sequelize) => {
  return sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    parent_category_id: {
      type: DataTypes.UUID,
      references: {
        model: 'product_categories',
        key: 'id',
      },
    },
  }, {
    tableName: 'product_categories',
    timestamps: true,
    underscored: true,
  });
};

module.exports = ProductCategory;