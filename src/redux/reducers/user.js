import { User } from '../actions/types';

const initialState = null;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case User.FETCH_USER:
            return action.payload;
        case User.REMOVE_USER:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
