const express = require('express')
const router = express.Router();
const { reqAuthList } = require('../../utils/lists-validation');
const { validateCreateList } = require('../../utils/validators')

//db
const { List } = require('../../db/models');

//get a specific list
router.get(
    '/:listId',
    reqAuthList,
    async (req, res) => {
        const { listId } = req.params;
        const list = await List.findByPk(listId);

        res.json(list);
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

        console.log('in api update')
        
        updatedList.title = title;
        // updatedList.column = column;

        updatedList.save();

        res.json(updatedList);
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
        res.json({
            message: "Successfully deleted"
        });
    }
);


module.exports = router;
