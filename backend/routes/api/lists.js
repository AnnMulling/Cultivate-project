const express = require('express')
const router = express.Router();
const { reqAuthList } = require('../../utils/lists-validation');
const { validateCreateList } = require('../../utils/validators')

//db
const { List, Card, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// get a specific list  and all cards related to the list
router.get(
    '/:listId',
    reqAuthList,
    async (req, res) => {
        const { user } = req;
        const { listId } = req.params;
        const list = await List.findByPk(listId, {
            include: [
                {
                    model: Card,
                    where: {
                        list_id: listId,
                    }
                }
            ]
        });

       return res.json(list);
    }

);

//edit a list
router.put(
    '/:listId',
    [ reqAuthList, validateCreateList ],
    async (req, res) => {

        const { title } = req.body; //add column later
        const { listId } = req.params;
        const updatedList = await List.findByPk(listId);


        updatedList.title = title;
        // updatedList.column = column;
        updatedList.save();

       return res.json(updatedList);
    }
);


// delete a list
router.delete(
    '/:listId',
    reqAuthList,
    async (req, res) => {
        const { listId } = req.params;
        const list = await List.findByPk(listId);

        list.destroy();

        return res.json({
            message: "Successfully deleted"
        });
    }
);




module.exports = router;
