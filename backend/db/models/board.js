'use strict';

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has many list
      Board.hasMany(models.List, {
        foreignKey: 'board_id'
      });

      // owned by user
      Board.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Board.init({
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
