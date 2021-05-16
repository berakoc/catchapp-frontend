import { Session } from './types';

export const getSessionUser = (sessionUser) => ({
    type: Session.FETCH_SESSION_USER,
    payload: sessionUser,
});

export const logoutSession = () => ({
    type: Session.REMOVE_SESSION_USER,
});
