'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to many lists
      Card.belongsTo(models.List, {
        foreignKey: 'list_id'
      });

      // belongs to a user
      Card.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      // belongs to many boards
      Card.belongsTo(models.Board, {
        foreignKey: 'board_id'
      });
    }
  }
  Card.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    board_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255]
      }
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
