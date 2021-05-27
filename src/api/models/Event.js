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
     */
    constructor(
        id,
        creatorId,
        title,
        description,
        creationDate,
        location,
        listAttendees
    ) {
        this.id = id;
        this.creatorId = creatorId;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.location = location;
        this.listAttendees = listAttendees;
    }
}
