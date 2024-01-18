import { csrfFetch } from "./csrf";

const LOGIN_USER = "session/loginUser";
export const LOGGOUT_USER = "session/loggoutUser";

const logginUser = (user) => {
    return {
      type: LOGIN_USER,
      payload: user,
    };
  };

const loggoutUser = () => {
    return {
      type: LOGGOUT_USER,
    };
  };

  //log in
  export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(logginUser(data.user));

    return response;
  };

  //log out
  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(loggoutUser());
    return response;
  };


  export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(logginUser(data.user));
    return response;
  };


// signup
  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(logginUser(data.user));
    return response;
  };

  const initialState = { user: null };

  const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case LOGIN_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case LOGGOUT_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };

  export default sessionReducer;
