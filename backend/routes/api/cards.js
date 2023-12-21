const express = require('express')
const router = express.Router();
const { reqAuthCard } = require('../../utils/cards-validation');
const { validateCreateCard } = require('../../utils/validators')

//db
const { List, Card, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { route } = require('./lists');



//get a specific card on the current list
router.get(
    '/:cardId',
    requireAuth,
    async (req, res) => {

        const { cardId } = req.params;

        const card = await Card.findByPk(cardId);

        return res.json(card);
    }
);


//edit a specific card
router.put(
    '/:cardId',
    [ reqAuthCard, validateCreateCard ],
    async (req, res) => {

        const { cardId } = req.params;
        const { description } = req.body;

        const updatedCard = await Card.findByPk(cardId);

        updatedCard.description = description;
        updatedCard.save();

        return res.json(updatedCard)
    }
);


//delete a card
router.delete(
    '/:cardId',
    reqAuthCard,
    async (req, res) => {

        const { cardId } = req.params;
        const card = await Card.findByPk(cardId);

        card.destroy();

        return res.json({
            message: "Successfully deleted"
        });
    }
);



module.exports = router;
