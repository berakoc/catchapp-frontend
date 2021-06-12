export default class User {
    /**
     * @param {String} name
     * @param {String} email
     * @param {String} description
     * @param {String} id
     * @param {String[]} createdEvents
     * @param {Number} numberOfEventsCreated
     * @param {Number} numberOfFollowers
     * @param {String} profilePicture
     * @param {Number} numberOfFollowing
     * @param {String[]} followingList
     * @param {String[]} followersList
     */
    constructor(
        name,
        email,
        description,
        id,
        createdEvents,
        numberOfEventsCreated,
        followersList,
        followingList,
        numberOfFollowers,
        numberOfFollowing,
        profilePicture,
        joinDate,
        location
    ) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.id = id;
        this.createdEvents = createdEvents;
        this.numberOfEventsCreated = numberOfEventsCreated;
        this.numberOfFollowers = numberOfFollowers;
        this.profilePicture = profilePicture;
        this.joinDate = joinDate;
        this.location = location;
        this.followersList = followersList;
        this.followingList = followingList;
        this.numberOfFollowing = numberOfFollowing;
    }

    static create = (o) => {
        const keys = [
            'name',
            'email',
            'description',
            'id',
            'createdEvents',
            'numberOfEventsCreated',
            'followersList',
            'followingList',
            'numberOfFollowers',
            'numberOfFollowing',
            'profilePicture',
            'joinDate',
            'location',
        ];
        return new User(...keys.map((key) => o[key]));
    };
}
