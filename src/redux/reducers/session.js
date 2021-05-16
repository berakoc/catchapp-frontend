import { Session } from '../actions/types';

const initialState = null;

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Session.FETCH_SESSION_USER:
            return action.payload;
        case Session.REMOVE_SESSION_USER:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;
