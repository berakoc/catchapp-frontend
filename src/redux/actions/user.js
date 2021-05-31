import { User } from "./types";

export const fetchUser = user => ({
    type: User.FETCH_USER,
    payload: user
})

export const removeUser = () => ({
    type: User.REMOVE_USER
})