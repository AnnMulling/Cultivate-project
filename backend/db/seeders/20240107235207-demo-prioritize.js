'use strict';
const { Prioritize } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Prioritize.bulkCreate([
      {
        user_id: 1,
        board_id: 1,
      },
      {
        user_id: 1,
        board_id: 3,
      },
      {
        user_id: 2,
        board_id: 4,
      },
      {
        user_id: 2,
        board_id: 5,
      },
      {
        user_id: 3,
        board_id: 6,
      },
      {
        user_id: 4,
        board_id: 8,
      },
      {
        user_id: 4,
        board_id: 9,
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Prioritizes";
    return await queryInterface.bulkDelete('Prioritizes', null, {});
  }
};
