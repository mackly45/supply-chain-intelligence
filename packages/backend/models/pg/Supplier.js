// Modèle Fournisseur pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Supplier = (sequelize) => {
  return sequelize.define('Supplier', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'suppliers',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Supplier;