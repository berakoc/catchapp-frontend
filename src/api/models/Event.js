export default class Event {
    /**
     * Event Model
     * @param {String} id
     * @param {String} creatorEmail
     * @param {String} title
     * @param {String} description
     * @param {Date} creationDate
     * @param {String} location
     * @param {Array<String>} listAttendees
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {number} numberOfLikes
     * @param {String} perk
     * @param {String[]} listOfUsersWhoLiked
     * @param {number} numberOfAttendees
     */
    constructor(
        id,
        creatorEmail,
        title,
        description,
        creationDate,
        location,
        listAttendees,
        numberOfAttendees,
        startDate,
        endDate,
        listOfUsersWhoLiked,
        numberOfLikes,
        perk
    ) {
        this.id = id;
        this.creatorEmail = creatorEmail;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.location = location;
        this.listAttendees = listAttendees;
        this.numberOfAttendees = numberOfAttendees;
        this.startDate = startDate;
        this.endDate = endDate;
        this.listOfUsersWhoLiked = listOfUsersWhoLiked;
        this.numberOfLikes = numberOfLikes;
        this.perk = perk;
    }
}

Object.freeze(Event.constructor);
