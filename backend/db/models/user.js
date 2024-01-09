'use strict';
const {
   Model,
   Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user has many boards
      User.hasMany(models.Board, {
        foreignKey: 'user_id',
      });

      // user has many lists
      User.hasMany(models.List, {
        foreignKey: 'user_id',
      });

      // user has many cards
      User.hasMany(models.Card, {
        foreignKey: 'user_id'
      });

      //user has many priorities
      User.hasMany(models.Prioritize, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      Validator: {
        len: [4, 30],
        isNotEmail(value){
          if (Validator.isEmail(value)){
            throw new Error ("Cannot be an email.")
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      Validator: {
        len: [3, 256],
        isEmail: true
      }

    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      Validator: {
        len: [60, 60]
      }

    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
