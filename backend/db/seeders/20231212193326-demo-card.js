'use strict';
const { Card } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//for public collaborate board
// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const cards = [...Array(40)].map((card) => ({
//     user_id: getRandomInt(1, 4),
//     board_id: getRandomInt(1, 10),
//     list_id: getRandomInt(1, 36),
//     description: `Task${getRandomInt(1, 40)}`
// }));


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Card.bulkCreate([
      {
        user_id: 1,
        board_id: 1,
        list_id: 1,
        description: "Meeting with Marketing team"
      },
      {
        user_id: 1,
        board_id: 1,
        list_id: 1,
        description: "Meeting with Marketing team2"
      },
      {
        user_id: 1,
        board_id: 1,
        list_id: 2,
        description: "Inform team when emails sent"
      },
      {
        user_id: 1,
        board_id: 1,
        list_id: 2,
        description: "Update the social-media table"
      },
      {
        user_id: 1,
        board_id: 2,
        list_id: 1,
        description: "Slide 37 needs to be updated before morning meeting"
      },
      {
        user_id: 1,
        board_id: 2,
        list_id: 1,
        description: "Check spelling on slide show"
      },
      {
        user_id: 1,
        board_id: 2,
        list_id: 2,
        description: "PR update logo"
      },
      {
        user_id: 1,
        board_id: 2,
        list_id: 3,
        description: "Upload Tutorial videos"
      },
      {
        user_id: 1,
        board_id: 3,
        list_id: 1,
        description: "Design Assessts-illustrations"
      },
      {
        user_id: 1,
        board_id: 3,
        list_id: 2,
        description: "Redesign promo video"
      },
      {
        user_id: 1,
        board_id: 3,
        list_id: 3,
        description: "Approve legal agreement"
      },
      {
        user_id: 2,
        board_id: 4,
        list_id: 1,
        description: "Make a guest list!"
      },
      {
        user_id: 2,
        board_id: 4,
        list_id: 2,
        description: "Order chinese food and boba tea from ABC"
      },
      {
        user_id: 2,
        board_id: 4,
        list_id: 3,
        description: "Board game"
      },
      {
        user_id: 2,
        board_id: 4,
        list_id: 3,
        description: "Just dance"
      },
      {
        user_id: 2,
        board_id: 5,
        list_id: 1,
        description: "Chocolate, Vanilla, Strawberry"
      },
      {
        user_id: 2,
        board_id: 5,
        list_id: 1,
        description: "Mint Chocolate chip?"
      },
      {
        user_id: 2,
        board_id: 5,
        list_id: 2,
        description: "No balloons, only flowers!"
      },
      {
        user_id: 2,
        board_id: 5,
        list_id: 2,
        description: "Pastel theme? Dark theme?"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 1,
        description: "The pancake house downtown"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 1,
        description: "La Voûte Bistro"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 1,
        description: "Dalia's Pancake House"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 2,
        description: "Clean but full of details"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 2,
        description: "use a thick cardstock paper"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 3,
        description: "Visiting the tulip garden"
      },
      {
        user_id: 2,
        board_id: 6,
        list_id: 3,
        description: "karaoke at night"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 1,
        description: "Code review checklist"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 1,
        description: "consumer referral email program"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 2,
        description: "change from blue to green, and make them smaller"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 2,
        description: "add margin too"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 3,
        description: "audio is delayed.."
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 3,
        description: "drag and drop issue"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 4,
        description: "Review legal agreement"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 4,
        description: "Schedule recurring meeting"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 5,
        description: "Check if the report is actually turned in before clossing down anything!"
      },
      {
        user_id: 3,
        board_id: 7,
        list_id: 5,
        description: "Add the issues found in today's testing"
      },
      {
        user_id: 3,
        board_id: 8,
        list_id: 1,
        description: "Campaign needs to be launched by the end of today!"
      },
      {
        user_id: 3,
        board_id: 8,
        list_id: 2,
        description: "LAUNCH TODAY BY NOON!"
      },
      {
        user_id: 3,
        board_id: 8,
        list_id: 3,
        description: "Schedule recurring meetup with customers"
      },
      {
        user_id: 3,
        board_id: 8,
        list_id: 4,
        description: "The old one was too wordy"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 1,
        description: "Make an invitation for the guests"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 1,
        description: "Make sure to mention the color theme"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 2,
        description: "Cheese, crackers, grapes and other finger-food"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 2,
        description: "Crinkle cookies and brownies"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 3,
        description: "wine, beer and soda"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 4,
        description: "Christmas tree and ornaments"
      },
      {
        user_id: 4,
        board_id: 9,
        list_id: 4,
        description: "Center-pience for the dining table"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 1,
        description: "Cardio at least 3 days a week!"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 1,
        description: "Reduce the amount of cards intake each day"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 2,
        description: "Start paying attention to qualifications "
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 2,
        description: "Dont' be discouraged when people say no!"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 3,
        description: "Start meal plan and prep for each week"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 3,
        description: "Do weigh-training at least twice a week"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 4,
        description: "ABC school has good reputation"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 4,
        description: "EDF school is less pricey"
      },
      {
        user_id: 4,
        board_id: 10,
        list_id: 4,
        description: "or maybe Youtube?"
      }

    ], {validate: true})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Cards';
    return await queryInterface.bulkDelete('Cards', null, {});
  }
};
