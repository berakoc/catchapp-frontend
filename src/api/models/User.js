export default class User {
    /**
     * @param {String} name Required
     * @param {String} email Required
     * @param {String} description Required
     * @param {String} id
     * @param {Number} numberOfEventsCreated
     * @param {Number} numberOfFollowers
     * @param {Number} rating
     */
    constructor(
        name,
        email,
        description,
        id,
        numberOfEventsCreated,
        numberOfFollowers,
        rating
    ) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.id = id;
        this.numberOfEventsCreated = numberOfEventsCreated;
        this.numberOfFollowers = numberOfFollowers;
        this.rating = rating;
    }

    /**
     * Creates a new user model
     * @param {String} name
     * @param {String} email
     * @param {String} description
     */
    static createUser(name, email, description) {
        return new User(name, email, description);
    }
}
