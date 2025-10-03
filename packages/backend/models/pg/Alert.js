// Modèle Alerte pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const Alert = (sequelize) => {
  return sequelize.define('Alert', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    alert_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING(20),
      defaultValue: 'INFO',
      validate: {
        isIn: [['INFO', 'WARNING', 'ERROR', 'CRITICAL']],
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    related_entity_type: {
      type: DataTypes.STRING(50),
    },
    related_entity_id: {
      type: DataTypes.UUID,
    },
    is_resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resolved_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    resolved_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'alerts',
    timestamps: true,
    underscored: true,
  });
};

module.exports = Alert;