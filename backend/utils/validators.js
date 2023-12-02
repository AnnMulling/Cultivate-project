const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');


//create board validate
const validators = {

    validateCreateBoard : [
        check('name')
            .exists({ checkFalsy: true})
            .withMessage('Field is required'),
        check('is_public')
            .exists({ checkFalsy: true})
            .withMessage('Field is required'),

        handleValidationErrors
    ]
}

module.exports = validators
