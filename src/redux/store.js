import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { EMPTY_STRING } from '../lib/string';
import rootReducer from './reducers/root';

const initialState = {
    user: null,
    error: EMPTY_STRING,
};
const middlewares = [thunk];

const loadStore = (preloadedState) =>
    createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

export default loadStore(initialState);
