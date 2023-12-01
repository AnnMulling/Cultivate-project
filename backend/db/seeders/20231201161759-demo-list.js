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
        board_id: '1',
        column: '1',
      },
      {
        title: 'Afternoon Meeting',
        board_id: '1',
        column: '2',
      },
      {
        title: 'Create offer emails',
        board_id:'1',
        column: '3',
      },
      {
        title: 'Update social media contents',
        board_id:'1',
        column:'4',
      },
      {
        title: 'Traning Case detail slides',
        board_id: '2',
        column: '1',
      },
      {
        title:'Afternoon Stand-up',
        board_id: '2',
        column: '2',
      },
      {
        title: 'Analytic Data',
        board_id: '2',
        column: '3',
      },
      {
        title: 'Social Media Campaign',
        board_id: '3',
        column: '1',
      },
      {
        title:'Web Redesign',
        board_id: '3',
        column:'2',
      },
      {
        title: 'Brand Guidlines',
        board_id: '3',
        column: '3',
      },
      {
        title: 'Guests',
        board_id: '4',
        column:'1',
      },
      {
        title:'Food & Drinks',
        board_id: '4',
        column: '2',
      },
      {
        title: 'Games',
        board_id:'4',
        column: '3',
      },
      {
        title: 'Cupcake choices',
        board_id:'5',
        column: '2',
      },
      {
        title: 'Interior Decor',
        board_id: '5',
        column:'2',
      },
      {
        title: 'Brunch places',
        board_id: '6',
        column: '1',
      },
      {
        title: 'Invitation card design',
        board_id: '6',
        column: '2',
      },
      {
        title: 'Activities',
        board_id: '6',
        column: '3',
      },
      {
        title: 'Lauch Features',
        board_id:'7',
        column:'1',
      },
      {
        title: 'New icon and button for web',
        board_id:'7',
        column:'2',
      },
      {
        title: 'Video & Audio load issue',
        board_id: '7',
        column: '3',
      },
      {
        title:'Social media assesst',
        board_id:'7',
        column: '4',
      },
      {
        title: 'Update status report',
        board_id: '7',
        column: '5',
      },
      {
        title: 'Plan Instagram contest',
        board_id: '8',
        column: '1',
      },
      {
        title: 'Schedule newslatter',
        board_id: '8',
        column: '2',
      },
      {
        title: 'Prepare customer feedback',
        board_id: '8',
        column: '3',
      },
      {
        title: 'Outline content plan',
        board_id:'8',
        column: '4',
      },
      {
        title: 'Christmas-eve night',
        board_id:'9',
        column: '1',
      },
      {
        title: 'Mail family christmas cards',
        board_id: '9',
        column: '1',
      },
      {
        title: 'Food and dessert',
        board_id: '9',
        column: '2',
      },
      {
        title: 'Beverages',
        board_id: '9',
        column: '3',
      },
      {
        title: 'Decoration',
        board_id: '9',
        column: '4',
      },
      {
        title:'Get fit!',
        board_id: '10',
        column: '1',
      },
      {
        title: 'Apply to jobs',
        board_id: '10',
        column:'2',
      },
      {
        title: 'Gain weight!',
        board_id:'10',
        column:'3',
      },
      {
        title: 'Start taking guitar lesson',
        board_id: '10',
        column: '4',
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
