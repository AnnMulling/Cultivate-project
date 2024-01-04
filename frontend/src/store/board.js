import { csrfFetch } from "./csrf";

const GET_BOARDS = "board/getAllBoards";
const REMOVE_BOARD = "board/removeBoard";
const EDIT_BOARD = "board/editBoard";
const CREAT_BOARD = "board/createBoard";
const LOAD_BOARD = "board/loadBoard";
const MOVE_LIST = "board/moveList";

const loadBoard = (board) => {
    return {
        type: LOAD_BOARD,
        payload: board
    };
};

const getAllBoards = (boards) => {
    return {
        type: GET_BOARDS,
        payload: boards
    };
};

const createBoard = (board) => {
    return {
        type: CREAT_BOARD,
        payload: board
    };
};

const deleteBoard = (boardId) => {
    return {
        type: REMOVE_BOARD,
        payload: boardId
    };
};

export const moveList = (newListOrder, boardId) => {

    return {
        type: MOVE_LIST,
        payload: {
            newListOrder: newListOrder,
            boardId: boardId ,

        }
    };
};

//get a board
export const fetchABoard = (boardId) => async (dispatch) => {
    try {

        const response =  await csrfFetch(`/api/boards/${boardId}`);

        if (response.ok) {
            const board = await response.json();
            dispatch(loadBoard(board));
            return board;
        };


    }catch(error) {
        console.log(error);
        return error;
    };
};


//get all boards
export const fetchAllBoard = () => async (dispatch) => {
    try {

        const response = await csrfFetch("/api/boards/current");
        if (response.ok) {
            const boards = await response.json();
            console.log('fetch all boards', boards)
            dispatch(getAllBoards(boards));
        };

    }catch(error) {
        console.log(error);
        return error;
    };
};

//create a board
export const fetchCreateBoard = (newBoard) => async (dispatch) => {
    try {

        const response = await csrfFetch("/api/boards", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBoard),
        });
        if (response.ok) {
            const board = await response.json();
            dispatch(createBoard(board));

            return board;
        };

    }catch(error) {
        console.log(error);
        return error;
    }
};

//Edit Board
export const fetchEditBoard = (boardId, boardDetails) => async (dispatch) => {
    try {

        const response = await csrfFetch(`/api/boards/${boardId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(boardDetails)
        });

        if (response.ok) {
            const board = await response.json();
            dispatch(getAllBoards(board));

            return board;
        };

    }catch(error) {
        console.log(error);
        return error;
    }
};


//delete board
export const fetchDeleteBoard = (boardId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/boards/${boardId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const message = await response.json();
            dispatch(deleteBoard(boardId));

            return message;
        }

    }catch(error) {
        console.log(error);
        return error;
    }
};


export const fetchMoveList = (newListOrder, boardId) => async (dispatch) => {
    try {
           const response = await csrfFetch(`/api/boards/${boardId}`, {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body:  JSON.stringify(newListOrder)

           });
           console.log('new list thunk', newListOrder)

           if (response.ok) {
               const lists = await response.json();
               console.log('fetch move list ', lists)
                dispatch(moveList(lists, boardId));
                return lists;
           }

    }catch(error) {

        console.log(error);
        return error;
    }
};




const initialState = {};

const boardReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BOARD:
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState;

        case GET_BOARDS:
            newState = Object.assign({}, state);
            action.payload.Boards.forEach((board) =>
                newState[board.id] = board
            );
            return newState;


        case CREAT_BOARD:
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };

        return newState;


        case REMOVE_BOARD:
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;


        case MOVE_LIST:
            const {  newListOrder, boardId } = action.payload;
            newState = Object.assign({}, state);
            newState[boardId].Lists = newListOrder

            return newState;

        default:
            return state;
    };
};

export default boardReducer;
