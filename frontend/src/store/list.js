import { csrfFetch } from "./csrf";

const GET_LISTS = "list/getAllLists";
const REMOVE_LISTS = "list/removeList";
const EDIT_LIST = "list/editList";
const CREATE_LIST = "list/createList";

const getAllLists = (lists) => {
    return {
        type: GET_LISTS,
        payload: lists
    };
};

//get all list on the board
export const fetchAllLists = (boardId) => async (dispatch) => {
    try {

        const response = await csrfFetch(`/api/boards/${boardId}/lists`);
        if (response.ok) {
            const lists = await response.json();
            dispatch(getAllLists(lists));
        };

    }catch(error) {
        console.log(error);
        return error;
    };
};





const initialState = {};

const listReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LISTS:
            newState = Object.assign({}, state);
            action.payload.Lists.forEach((list) => {
                newState[list.id] = list
            });
            return newState;
        default:
            return state;
    }
};


export default listReducer;
