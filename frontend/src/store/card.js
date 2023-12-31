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

const createCard = (card) => {
    return {
        type: CREATE_CARD,
        payload: card
    };
};

const removeCard = (cardId) => {
    return {
        type: REMOVE_CARD,
        payload: cardId
    };
};

//get all cards on the list
/// inactive : getting from list now at the moment

export const fetchAllCards = (boardId, listId ) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/boards/${boardId}/lists/${listId}/cards`);
        if (response.ok) {
            const cards = await response.json();
            dispatch(getAllCards(cards));
        };

    }catch(error) {
        console.log(error)
        return error;
    }
}


//create card
export const fetchCreateCard = (boardId, listId, cardDetails) =>  async (dispatch) => {
    try {

        const response = await csrfFetch(`/api/boards/${boardId}/lists/${listId}/cards`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardDetails),
        });

        if (response.ok) {
            const newCard = await response.json();
            dispatch(createCard(newCard));

            return newCard;
        }
    }catch(error) {
        console.log(error)
        return error;
    }
};

//edit card
export const fetchEditCard  = (cardId, cardDetails) => async (dispatch) => {
    try {

        const response = await csrfFetch(`/api/cards/${cardId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardDetails),
        });

        if (response.ok) {
            const card = await response.json();
            dispatch(createCard(card));

            return card;
        }

    }catch(error) {
        console.log(error);
        return error;
    }
};

//delete card
export const fetchDeleteCard = (cardId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/cards/${cardId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const message = await response.json();
            dispatch(removeCard(cardId));

            return message;
        }

    }catch (error) {
        console.log(error);
        return error;
    }
}


const initialState = {};

const cardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case "GET_CARDS":
            newState = Object.assign({}, state);
            action.payload.Cards.forEach((card) => {
                newState[card.id] = card;
            });
            return newState;


        case "CREATE_CARD":
            newState = {
                ...state,
                [action.payload.id]: [action.payload]
            };
            return newState;

        case "REMOVE_CARD":
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;

        default:
            return state;
    };
};

export default cardReducer;
