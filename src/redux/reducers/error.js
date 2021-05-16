import { EMPTY_STRING } from '../../lib/string';
import { Error } from '../actions/types';

const initialState = EMPTY_STRING;

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case Error.RECEIVE_ERROR:
            return action.payload;
        case Error.CLEAR_ERROR:
            return initialState;
        default:
            return state;
    }
};

export default errorReducer;
