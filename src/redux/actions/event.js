import { Event } from "./types";

export const fetchEvent = event => ({
    type: Event.FETCH_EVENT,
    payload: event
})

export const removeEvent = () => ({
    type: Event.REMOVE_EVENT,
})