const { User, Board, List } = require('../db/models');


//check if board exists and if user has permission to access the board
const reqAuthBoard = async (req, res, next) => {
    const { user } = req;
    const { boardId } = req.params;
    const board = await Board.findByPk(boardId);

    if (!board) {
        res.status(400);
        res.json({
            "message": "Board couldn't be found"
        });
    }

    if (user.id === board.user_id) {
        next();
    }else {

        const err = new Error ('Authorization required');
        err.errors = { message: 'Forbidden'}
        err.status = 403;
        return next(err);
    };

};


module.exports = {
    reqAuthBoard,

}
