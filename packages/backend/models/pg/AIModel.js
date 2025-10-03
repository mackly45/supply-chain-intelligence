// Modèle Modèle d'IA pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const AIModel = (sequelize) => {
  return sequelize.define('AIModel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['PREDICTION', 'CLASSIFICATION', 'CLUSTERING', 'ANOMALY_DETECTION']],
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    file_path: {
      type: DataTypes.STRING(500),
    },
    accuracy: {
      type: DataTypes.DECIMAL(5, 4),
    },
    training_data_size: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'ai_models',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'version'],
      },
    ],
  });
};

module.exports = AIModel;