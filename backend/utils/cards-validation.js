const { Card, List } = require('../db/models');

//check if user has permission and card exists
const reqAuthCard = async (req, res, next) => {
    const { user } = req;
    const { cardId } = req.params;
    const card = await Card.findByPk(cardId);

    if (!card) {
        res.status(400);
        res.json({
            "message": "Card couldn't be found"
        });
    }

    //add check, if board is private or public later

    if (user.id === card.user_id) {
        next();
    }else {

        const err = new Error ('Authorization required');
        err.errors = { message: 'Forbidden'}
        err.status = 403;
        return next(err);
    };
};


module.exports = {
    reqAuthCard,

}
