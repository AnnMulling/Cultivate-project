'use strict';

const { Board } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Board.bulkCreate([
      {
        name: 'Monday',
        user_id: 1,
        is_public: true,
      },
      {
        name: 'Tuesday',
        user_id: 1,
        is_public: true,
      },
      {
        name: 'Wednesday',
        user_id: 1,
        is_public: true,
      },
      {
        name: 'Friday Dinner',
        user_id: 2,
        is_public: false
      },
      {
        name: 'Saturday Birthday Party',
        user_id: 2,
        is_public: false
      },
      {
        name: 'Sunday Brunch',
        user_id: 2,
        is_public: false
      },
      {
        name: 'Capestone Project',
        user_id: 3,
        is_public: true,
      },
      {
        name: 'Product RoadMap',
        user_id: 3,
        is_public: true
      },
      {
        name: 'Christmas',
        user_id: 4,
        is_public: false
      },
      {
        name: 'New-Year-Resolution',
        user_id: 4,
        is_public: false
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Boards';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Friday Dinner',
      'Saturday Birthday Party',
      'Sunday Brunch',
      'Capestone Project',
      'Product RoadMap',
      'Christmas',
      'New-Year-Resolution'
    ] }
    }, {});
  }
};
