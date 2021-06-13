import { Event } from "../actions/types"

const initialState = null

const eventReducer = (state=initialState, action) => {
    switch(action.type) {
        case Event.FETCH_EVENT: return action.payload
        case Event.REMOVE_EVENT: return initialState
        default: return state
    }
}

export default eventReducer