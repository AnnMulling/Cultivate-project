const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { reqAuthBoard } = require('../../utils/boards-validation')
const {  validateCreateBoard } = require('../../utils/validators')

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

            // console.log('all boards', boards)
            res.json(boards);
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

        res.json(board);
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
        res.json(newBoard)

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

        updatedBoard.save();
        res.json(updatedBoard);
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
        res.json({
            message: "Successfully deleted"
        });
    }
);


//lists
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

        res.json(lists)
    }
)

module.exports = router;
