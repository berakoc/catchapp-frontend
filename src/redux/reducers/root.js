import { combineReducers } from 'redux';
import errorReducer from './error';
import userReducer from './user';

export default combineReducers({
    user: userReducer,
    error: errorReducer,
});
