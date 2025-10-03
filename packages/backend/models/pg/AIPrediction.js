// Modèle Prédiction d'IA pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const AIPrediction = (sequelize) => {
  return sequelize.define('AIPrediction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    model_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ai_models',
        key: 'id',
      },
    },
    input_data: {
      type: DataTypes.JSONB,
    },
    prediction: {
      type: DataTypes.JSONB,
    },
    confidence: {
      type: DataTypes.DECIMAL(5, 4),
    },
    actual_result: {
      type: DataTypes.JSONB,
    },
  }, {
    tableName: 'ai_predictions',
    timestamps: true,
    underscored: true,
  });
};

module.exports = AIPrediction;