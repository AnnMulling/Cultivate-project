'use strict';

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to board
      List.belongsTo(models.Board, {
        foreignKey: 'board_id',
      });

      List.belongsTo(models.User, {
        foreignKey:  'user_id'
      });

    }
  }
  List.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      Validator: {
        len: [5, 30]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // column: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};
