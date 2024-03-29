const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { reqAuthBoard } = require('../../utils/boards-validation');
const {  validateCreateBoard, validateCreateList, validateCreateCard } = require('../../utils/validators');
const { reqAuthList } = require('../../utils/lists-validation');


//db
const { User, Board, List, Card } = require('../../db/models');

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

            // const allBoards = [];

            // for (let board of boards) {
            //     board = board.toJSON();

            //     allBoards.push(board);
            // };


           return res.json({
                "Boards": boards
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
                    as: 'Lists',
                    include: [
                        {
                            model: Card,
                            as: 'Cards'
                        }
                    ]
                }
            ],
            order: [
                [ { model: List,  as:'Lists' }, 'createdAt', 'ASC'],
                [ { model: List,  as:'Lists' } , { model: Card, as: 'Cards' }, 'createdAt', 'ASC']
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

        await newBoard.save();
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
                is_public,
                star } = req.body;


        console.log('star backend', star)

        const { boardId } = req.params;

        const updatedBoard = await Board.findByPk(boardId);


        updatedBoard.name = name;
        updatedBoard.is_public = is_public;
        updatedBoard.star = star;


        await updatedBoard.save();

        return res.json(updatedBoard);
    }
);

//Movelist
router.patch(
    '/:boardId',
    reqAuthBoard,
    async (req, res) => {
        const { boardId } = req.params;
        const  newListOrder  = req.body;
        // console.log('new order', newListOrder)
        const board = await Board.findByPk(boardId, {
            include: [
                {
                    model: List,

                }
            ]
        });




        board.Lists = newListOrder

        await board.save();

        // console.log('board list after', board)
        return res.json(board.Lists);
    }
)

//move list get





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
                    model: Card,
                },

                {
                    model: User,
                    where: {
                        id: user.id
                    }
                },

            ]
        });

        // const allList = [];
        // for (let list of lists) {
        //     list = list.toJSON();

        //     allList.push(list);
        // };

        return res.json({
            "Lists": lists
        });
    }
);

// get all cards
//get all cards on a list own by the current user ??
router.get(
    '/:boardId/lists/:listId/cards',
    reqAuthBoard,
    async (req, res) => {
        const { boardId, listId } = req.params;
        const cards = await Card.findAll({

            where: {
               board_id: boardId,
               list_id: listId
            },

            // include: [

            //     {
            //         model: User,
            //         where: {
            //             id: user.id
            //         }
            //     }
            // ]
        });



        return res.json({
             "Cards": cards
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


        await newList.save();
        res.status(201);

        return res.json(newList);
    }
);


// create a card
router.post(
    '/:boardId/lists/:listId/cards',
    [ requireAuth, reqAuthBoard, validateCreateCard],
    async (req, res) => {

        const { user } = req;

        const { listId, boardId } = req.params;

        const { description } = req.body;

        const newCard = await Card.create({
            user_id: user.id,
            list_id: listId,
            board_id: boardId,
            description: description
        });

        await newCard.save();
        res.status(201);

        return res.json(newCard)
    }
)

module.exports = router;
