const { User, Board, List } = require('../db/models');

//check if user has permission and list exists
const reqAuthList = async (req, res, next) => {
    const { user } = req;
    const { listId } = req.params;
    const list = await List.findByPk(listId);

    if (!list) {
        res.status(400);
        res.json({
            "message": "List couldn't be found"
        });
    }

    //add check, if board is private or public later

    if (user.id === list.user_id) {
        next();
        
    }else {

        const err = new Error ('Authorization required');
        err.errors = { message: 'Forbidden'}
        err.status = 403;
        return next(err);
    };
};


module.exports = {
    reqAuthList,

}
