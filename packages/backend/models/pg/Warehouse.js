// Modèle Entrepôt pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Warehouse = (sequelize) => {
  return sequelize.define('Warehouse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326), // Utilisation de PostGIS
    },
    address: {
      type: DataTypes.TEXT,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    manager_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    tableName: 'warehouses',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Warehouse;