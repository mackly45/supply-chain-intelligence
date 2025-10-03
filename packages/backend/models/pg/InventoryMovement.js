// Modèle Mouvement d'Inventaire pour PostgreSQL IA
const { DataTypes } = require('sequelize');

const InventoryMovement = (sequelize) => {
  return sequelize.define('InventoryMovement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    inventory_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'id',
      },
    },
    movement_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT']],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference_type: {
      type: DataTypes.STRING(50),
    },
    reference_id: {
      type: DataTypes.UUID,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    tableName: 'inventory_movements',
    timestamps: true,
    underscored: true,
  });
};

module.exports = InventoryMovement;