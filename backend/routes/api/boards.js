const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { reqAuthBoard } = require('../../utils/boards-validation');
const {  validateCreateBoard, validateCreateList } = require('../../utils/validators');
const { reqAuthList } = require('../../utils/lists-validation');


//db
const { User, Board, List } = require('../../db/models');

//all board owned by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
            const { user } = req;
            //get all the boards and list owned by user

            const boards = await Board.findAll({
                where: {
                    user_id: user.id,
                },
                include: [
                    {
                        model: List
                    }
                ]

            });

            const allBoards = [];

            for (let board of boards) {
                board = board.toJSON();
                
                allBoards.push(board);
            };

           return res.json({
                "Boards": allBoards
            });
    }
);

//get details of a board
router.get(
   '/:boardId',
   reqAuthBoard,
    async (req, res) => {
        const { boardId } = req.params;

        const board = await Board.findByPk(boardId, {
            include: [
                {
                    model: List,
                }
            ]
        });

        return res.json(board);
    }
);


//create a board
router.post(
    '/',
    [ requireAuth,  validateCreateBoard ],
    async (req, res) => {
        const { user } = req;
        const { name,
                is_public } = req.body;

        const newBoard =  await Board.create({
            user_id: user.id,
            name,
            is_public
        });

        res.status(201);
       return res.json(newBoard)

    }
);

//edit board
router.put(
    '/:boardId',
    [ reqAuthBoard, validateCreateBoard ],
    async (req, res) => {
        const { name,
                is_public } = req.body;

        const { boardId } = req.params;

        const updatedBoard = await Board.findByPk(boardId);

        updatedBoard.name = name;
        updatedBoard.is_public = is_public;

        await updatedBoard.save();
        return res.json(updatedBoard);
    }
);


//delete board
router.delete(
    '/:boardId',
    reqAuthBoard,
    async (req, res) => {
        const { boardId } = req.params;
        const board = await Board.findByPk(boardId);

        await board.destroy();
        return res.json({
            message: "Successfully deleted"
        });
    }
);


//get all lists
router.get(
    '/:boardId/lists',
    reqAuthBoard,
    async (req, res) => {
        const { user } = req;
        const { boardId } = req.params;
        const lists = await List.findAll({
            where: {
                board_id: boardId
            },
            include: [
                {
                    model: User,
                    where: {
                        id: user.id
                    }
                },

            ]
        });

        const allList = [];
        for (let list of lists) {
            list = list.toJSON();

            allList.push(list);
        };

        return res.json({
            "Lists": allList
        });
    }
);


//create a list
router.post(
    '/:boardId/lists',
    [ requireAuth, reqAuthBoard, validateCreateList ],
    async (req, res) => {
        const { user } = req;

        const { title} = req.body; //add column later

        const { boardId } = req.params;

        const newList = await List.create({
            user_id: user.id,
            board_id: boardId,
            title
        });

        console.log('in api create')

        await newList.save();
        res.status(201);
        return res.json(newList);
    }
);


module.exports = router;
