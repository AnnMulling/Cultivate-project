import { csrfFetch } from "./csrf";

const GET_LISTS = "list/getAllLists";
const REMOVE_LIST = "list/removeList";
const EDIT_LIST = "list/editList";
const CREATE_LIST = "list/createList";

const getAllLists = (lists) => {
    return {
        type: GET_LISTS,
        payload: lists
    };
};

const createList = (list) => {
    return {
        type: CREATE_LIST,
        payload: list
    };
};

const removeList = (list) => {
    return {
        type: REMOVE_LIST,
        payload: list
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

//create list
export const fetchCreateList = (boardId, listDetails) => async (dispatch) => {
    try {
        console.log('create fetch', listDetails)
        const response = await csrfFetch(`/api/boards/${boardId}/lists`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listDetails),
        });

        if (response.ok) {
            const newList = await response.json();
            dispatch(createList(newList));
            return newList
        }
    }catch(error){
        console.log(error)
        return error;
    };
};


//edit a list
export const fetchEditList = (listId, listDetails) => async (dispatch) => {
    try {
        console.log('edit fetch', listDetails)
        const response = await csrfFetch(`/api/lists/${listId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listDetails),
        });

        if (response.ok) {
            const list = await response.json();
            dispatch(createList(list));

            return list
        }
    }catch(error){
        console.log(error)
        return error;
    };
};


//delete a list
export const fetchDeleteList = (listId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/lists/${listId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const message = await response.json();
            dispatch(removeList(listId));
            
            return message;
        }

    }catch(error) {
        console.log(error);
        return error;
    }
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

        case CREATE_LIST:
            newState = {
                ...state,
                [action.payload.ids]: action.payload
            };
            return newState;

        case REMOVE_LIST:
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;

        default:
            return state;
    };
};


export default listReducer;
