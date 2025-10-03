// Modèle Position de Véhicule pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const VehiclePosition = (sequelize) => {
  return sequelize.define('VehiclePosition', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id',
      },
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    speed: {
      type: DataTypes.DECIMAL(5, 2),
    },
    heading: {
      type: DataTypes.DECIMAL(5, 2),
    },
  }, {
    tableName: 'vehicle_positions',
    timestamps: true,
    underscored: true,
  });
};

module.exports = VehiclePosition;