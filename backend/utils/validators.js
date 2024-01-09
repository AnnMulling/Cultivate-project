const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');


//create board validate
const validators = {

    validateCreateBoard: [
        check('name')
            .exists({ checkFalsy: true})
            .withMessage('Field is required'),
        check('is_public')
            .exists({checkNull: true})
            .withMessage('Field is required'),

        handleValidationErrors
    ],

    validateCreateList: [
        check('title')
            .exists({ checkFalsy: true })
            .withMessage('Field is required'),
        // check('column')
        //     .exists({ checkFalsy: true })
        //     .withMessage('Field is required'),

        handleValidationErrors
    ],

    validateCreateCard: [
        check('description')
            .exists({ checkFalsy: true})
            .withMessage('Field is required'),

        handleValidationErrors
    ]
};

module.exports = validators
