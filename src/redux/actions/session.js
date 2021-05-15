import { Session } from "./types";

const getSessionUser = (sessionUser) => ({
    type: Session.FETCH_SESSION_USER,
    payload: sessionUser
})

export const fetchSessionUser = () => async (dispatch) => {
    const sessionUser = 
}