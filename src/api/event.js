import {
    deleteRequest,
    fetchJSON,
    getRequest,
    injectQueryParams,
    postRequest,
    ResponseType,
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
    /**
     * @typedef {import('./models/EnrichedEvent').default} EnrichedEvent
     * @param {String} eventId
     * @returns {Promise<EnrichedEvent>}
     */
    static getEnrichedEvent = async (eventId, requestUserEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/enriched'), {
                eventId,
                requestUserEmail,
            }),
            getRequest(),
            ResponseType.JSON
        );

    static deleteEvent = async (eventId) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL, { eventId }),
            deleteRequest()
        );

    static addUserToEvent = async (eventId, userEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/attendee'), {
                eventId,
                userEmail,
            }),
            postRequest()
        );

    static removeUserFromEvent = async (eventId, userEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/attendee'), {
                eventId,
                userEmail,
            }),
            deleteRequest()
        );

    static addLike = async (eventId, userEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/like'), {
                eventId,
                userEmail,
            }),
            postRequest()
        );

    static removeLike = async (eventId, userEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/like'), {
                eventId,
                userEmail,
            }),
            deleteRequest()
        );

    /**
     *
     * @param {Number} pageId
     * @param {String} requestUserEmail
     * @returns {Promise<EnrichedEvent[]>}
     */
    static getEnrichedEventPage = async (pageId, requestUserEmail) =>
        await fetchJSON(
            injectQueryParams(EVENT_API_URL.concat('/enriched/page'), {
                pageId,
                requestUserEmail,
            }),
            getRequest(),
            ResponseType.JSON
        );

    static getCreatedEnrichedEventPage = async (pageId, requestUserEmail, creatorUserEmail) => 
            await fetchJSON(injectQueryParams(EVENT_API_URL.concat('/created/enriched/page'), {
                pageId,
                creatorUserEmail,
                requestUserEmail
            }), getRequest, ResponseType.JSON)
}

Object.freeze(EventAPI.prototype);
