import { combineReducers } from 'redux';
import errorReducer from './error';
import eventReducer from './event';
import userReducer from './user';

export default combineReducers({
    user: userReducer,
    event: eventReducer,
    error: errorReducer,
});
