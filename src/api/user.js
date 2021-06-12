import {
    deleteRequest,
    fetchJSON,
    getRequest,
    injectQueryParams,
    postRequest,
} from '../lib/api';

const USER_API_URL = 'https://catchapp-user.herokuapp.com/api/v1/user';

export default class UserAPI {
    constructor() {
        throw new Error('Cannot create an object of a static class.');
    }

    /**
     * @typedef {import('./models/User').default} User
     * @typedef {{code: Number}} StatusCode
     * Creates a user with given model
     * @param {User} user
     * @returns {Promise<StatusCode>}
     */
    static createUser = async (user) =>
        await fetchJSON(USER_API_URL, postRequest(user));

    /**
     * @param {String} email
     * @returns {Promise<User>}
     */
    static getUser = async (email) =>
        await fetchJSON(
            injectQueryParams(USER_API_URL, { email }),
            getRequest()
        );

    /**
     * @param {String} email
     * @returns {Promise<StatusCode>}
     */
    static deleteUser = async (email) =>
        await fetchJSON(
            injectQueryParams(USER_API_URL, { email }),
            deleteRequest()
        );

    static addFollower = async (userEmail, followerEmail) =>
        await fetchJSON(
            injectQueryParams(USER_API_URL.concat('/follower'), {
                userEmail,
                followerEmail,
            }),
            postRequest()
        );

    static deleteFollower = async (userEmail, followerEmail) =>
        await fetchJSON(
            injectQueryParams(USER_API_URL.concat('/follower'), {
                userEmail,
                followerEmail,
            }),
            deleteRequest()
        );

    static getCreatedEvents = async (userEmail) =>
        await fetchJSON(
            injectQueryParams(USER_API_URL.concat('/event'), {
                userEmail,
            }),
            getRequest()
        );
}

Object.freeze(UserAPI.prototype);
