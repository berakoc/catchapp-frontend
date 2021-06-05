export default class Event {
    /**
     * Event Model
     * @param {String} id
     * @param {String} creatorId
     * @param {String} title
     * @param {String} description
     * @param {Date} creationDate
     * @param {String} location
     * @param {Array<String>} listAttendees
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {number} numberOfLikes
     * @param {String} perk
     * 
     */
    constructor(
        id,
        creatorId,
        title,
        description,
        creationDate,
        location,
        listAttendees,
        startDate,
        endDate,
        numberOfLikes,
        perk
    ) {
        this.id = id;
        this.creatorId = creatorId;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.location = location;
        this.listAttendees = listAttendees;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfLikes = numberOfLikes;
        this.perk = perk;
    }
}
