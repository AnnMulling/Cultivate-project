'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prioritize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Prioritize.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      
    }
  }
  Prioritize.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'Prioritize',
  });
  return Prioritize;
};
