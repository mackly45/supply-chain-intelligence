// Modèle Paramètre Système pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const SystemSetting = (sequelize) => {
  return sequelize.define('SystemSetting', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    setting_value: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'system_settings',
    timestamps: true,
    underscored: true,
  });
};

module.exports = SystemSetting;