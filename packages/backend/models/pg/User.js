// Modèle Utilisateur pour PostgreSQL IA
const { DataTypes } = require('sequelize');
const { getPostgresIADatabase } = require('../../config/sequelize.config');

const User = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: 'USER',
      validate: {
        isIn: [['USER', 'ADMIN', 'MANAGER']],
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });
};

module.exports = User;