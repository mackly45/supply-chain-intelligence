// Modèle Véhicule pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Vehicle = (sequelize) => {
  return sequelize.define('Vehicle', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    registration_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    vehicle_type: {
      type: DataTypes.STRING(100),
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    fuel_type: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [['DIESEL', 'PETROL', 'ELECTRIC', 'HYBRID']],
      },
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'AVAILABLE',
      validate: {
        isIn: [['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'RETIRED']],
      },
    },
    last_maintenance_date: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'vehicles',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Vehicle;