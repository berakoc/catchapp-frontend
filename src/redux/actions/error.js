import { Error } from './types';

export const receiveError = ({ message }) => ({
    type: Error.RECEIVE_ERROR,
    payload: message,
});

export const clearError = () => ({
    type: Error.CLEAR_ERROR,
});
