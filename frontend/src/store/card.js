import { csrfFetch } from "./csrf";

const GET_CARDS = "card/getAllCards";
const REMOVE_CARD = "card/removeCard";
const EDIT_CARD = "card/editCard";
const CREATE_CARD = "card/createCard";
const LOAD_BOaRD = "card/loadCard";

const getAllCards = (cards) => {
    return {
        type: GET_CARDS,
        payload: cards
    };
};


//get all cards


const initialState = {};

const cardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        default:
            return state;
    };
};

export default cardReducer;
