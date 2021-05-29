export default class User {
    /**
     * @param {String} name Required
     * @param {String} email Required
     * @param {String} description Required
     * @param {String} id
     * @param {Number} numberOfEventsCreated
     * @param {Number} numberOfFollowers
     * @param {Number} rating
     * @param {String} profilePicture
     */
    constructor(
        name,
        email,
        description,
        id,
        numberOfEventsCreated,
        numberOfFollowers,
        rating,
        profilePicture
    ) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.id = id;
        this.numberOfEventsCreated = numberOfEventsCreated;
        this.numberOfFollowers = numberOfFollowers;
        this.rating = rating;
        this.profilePicture = profilePicture;
    }
}
