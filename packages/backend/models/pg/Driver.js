// Modèle Chauffeur pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Driver = (sequelize) => {
  return sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true,
      },
    },
    license_expiry_date: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'drivers',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Driver;