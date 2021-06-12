export default class EnrichedEvent {
    /**
     *
     * @param {import('./Event').default} event
     * @param {Boolean} isLikedByTheGivenUser
     * @param {Boolean} isTheGivenUserAttendee
     */
    constructor(event, isLikedByTheGivenUser, isTheGivenUserAttendee) {
        this.event = event;
        this.isLikedByTheGivenUser = isLikedByTheGivenUser;
        this.isTheGivenUserAttendee = isTheGivenUserAttendee;
    }
}

Object.freeze(EnrichedEvent.prototype);
