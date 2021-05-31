import {
    deleteRequest,
    fetchJSON,
    getRequest,
    injectQueryParams,
    postRequest,
} from '../lib/api';

const EVENT_API_URL = 'https://catchapp-event.herokuapp.com/api/v1/event';

export default class EventAPI {
    constructor() {
        throw new Error('Cannot create an object of a static class.');
    }

    /**
     * @typedef {import('./models/Event').default} Event
     * @param {Event} event
     */
    static createEvent = async (event) =>
        await fetchJSON(EVENT_API_URL, postRequest(event));

    static getEvent = async (id) =>
        await fetchJSON(injectQueryParams(EVENT_API_URL, { id }, getRequest()));

    static deleteEvent = async (id) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL, { id }),
            deleteRequest()
        );

    static addUserToEvent = async (eventId, userId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL, { eventId, userId }),
            postRequest()
        );

    static removeUserFromEvent = async (eventId, userId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL, {
                eventId,
                userId,
            }),
            deleteRequest()
        );

    static addLike = async (eventId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/like'), { eventId }),
            postRequest()
        );

    static removeLike = async (eventId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/like'), { eventId }),
            deleteRequest()
        );

    static getEventPage = async (pageId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/eventPage'), { pageId }),
            getRequest()
        );
}

Object.freeze(EventAPI.prototype);
