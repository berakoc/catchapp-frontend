import { combineReducers } from 'redux';
import errorReducer from './error';
import sessionReducer from './session';

export default combineReducers({
    session: sessionReducer,
    error: errorReducer,
});
