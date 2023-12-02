'use strict';
const { List } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await List.bulkCreate([
      {
        title: 'Morning Stand-up',
        user_id: 1,
        board_id:  1,
        column: 1,
      },
      {
        title: 'Afternoon Meeting',
        user_id: 1,
        board_id: 1,
        column: 2,
      },
      {
        title: 'Create offer emails',
        user_id: 1,
        board_id: 1,
        column: 3,
      },
      {
        title: 'Update social media contents',
        user_id: 1,
        board_id: 1,
        column: 4,
      },
      {
        title: 'Traning Case detail slides',
        user_id: 1,
        board_id: 2,
        column: 1,
      },
      {
        title:'Afternoon Stand-up',
        user_id: 1,
        board_id: 2,
        column: 2,
      },
      {
        title: 'Analytic Data',
        user_id: 1,
        board_id: 2,
        column: 3,
      },
      {
        title: 'Social Media Campaign',
        user_id: 1,
        board_id: 3,
        column: 1,
      },
      {
        title:'Web Redesign',
        user_id: 1,
        board_id: 3,
        column: 2,
      },
      {
        title: 'Brand Guidlines',
        user_id: 1,
        board_id: 3,
        column: 3,
      },
      {
        title: 'Guests',
        user_id: 2,
        board_id: 4,
        column: 1,
      },
      {
        title:'Food & Drinks',
        user_id: 2,
        board_id: 4,
        column: 2,
      },
      {
        title: 'Games',
        user_id: 2,
        board_id: 4,
        column: 3,
      },
      {
        title: 'Cupcake choices',
        user_id: 2,
        board_id: 5,
        column: 1,
      },
      {
        title: 'Interior Decor',
        user_id: 2,
        board_id: 5,
        column: 2,
      },
      {
        title: 'Brunch places',
        user_id: 2,
        board_id: 6,
        column: 1,
      },
      {
        title: 'Invitation card design',
        user_id: 2,
        board_id: 6,
        column: 2,
      },
      {
        title: 'Activities',
        user_id: 2,
        board_id: 6,
        column: 3,
      },
      {
        title: 'Lauch Features',
        user_id: 3,
        board_id: 7,
        column: 1,
      },
      {
        title: 'New icon and button for web',
        user_id: 3,
        board_id: 7,
        column: 2,
      },
      {
        title: 'Video & Audio load issue',
        user_id: 3,
        board_id: 7,
        column: 3,
      },
      {
        title:'Social media assesst',
        user_id: 3,
        board_id: 7,
        column: 4,
      },
      {
        title: 'Update status report',
        user_id: 3,
        board_id: 7,
        column: 5,
      },
      {
        title: 'Plan Instagram contest',
        user_id: 3,
        board_id: 8,
        column: 1,
      },
      {
        title: 'Schedule newslatter',
        user_id: 3,
        board_id: 8,
        column: 2,
      },
      {
        title: 'Prepare customer feedback',
        user_id: 3,
        board_id: 8,
        column: 3,
      },
      {
        title: 'Outline content plan',
        user_id: 3,
        board_id: 8,
        column: 4,
      },
      {
        title: 'Christmas-eve night',
        user_id: 4,
        board_id: 9,
        column: 1,
      },
      {
        title: 'Mail family christmas cards',
        user_id: 4,
        board_id: 9,
        column: 2,
      },
      {
        title: 'Food and dessert',
        user_id: 4,
        board_id: 9,
        column: 3,
      },
      {
        title: 'Beverages',
        user_id: 4,
        board_id: 9,
        column: 4,
      },
      {
        title: 'Decoration',
        user_id: 4,
        board_id: 9,
        column: 5,
      },
      {
        title:'Get fit!',
        user_id: 4,
        board_id: 10,
        column: 1,
      },
      {
        title: 'Apply to jobs',
        user_id: 4,
        board_id: 10,
        column: 2,
      },
      {
        title: 'Gain weight!',
        user_id: 4,
        board_id: 10,
        column: 3,
      },
      {
        title: 'Start taking guitar lesson',
        user_id: 4,
        board_id: 10,
        column: 4,
      },

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Lists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: [
        'Morning Stand-up',
        'Afternoon Meeting',
        'Create offer emails',
        'Update social media contents',
        'Traning Case detail slides',
        'Afternoon Stand-up',
        'Analytic Data',
        'Social Media Campaign',
        'Web Redesign',
        'Brand Guidlines',
        'Guests',
        'Food & Drinks',
        'Games',
        'Cupcake choices',
        'Interior Decor',
        'Brunch places',
        'Invitation card design',
        'Activities',
        'Lauch Features',
        'Lauch Features',
        'Video & Audio load issue',
        'Social media assesst',
        'Update status report',
        'Plan Instagram contest',
        'Schedule newslatter',
        'Prepare customer feedback',
        'Outline content plan',
        'Christmas-eve night',
        'Mail family christmas cards',
        'Food and dessert',
        'Beverages',
        'Decoration',
        'Get fit!',
        'Apply to jobs',
        'Gain weight!',
        'Start taking guitar lesson'
    ] }
    }, {});
  }
};
