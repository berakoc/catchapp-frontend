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
     * @param {Number} numberOfFollowing
     * @param {String[]} followingList
     * @param {String[]} followersList
     */
    constructor(
        name,
        email,
        description,
        id,
        numberOfEventsCreated,
        followersList,
        followingList,
        numberOfFollowers,
        numberOfFollowing,
        rating,
        profilePicture,
        joinDate,
        location
    ) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.id = id;
        this.numberOfEventsCreated = numberOfEventsCreated;
        this.numberOfFollowers = numberOfFollowers;
        this.rating = rating;
        this.profilePicture = profilePicture;
        this.joinDate = joinDate
        this.location = location
        this.followersList = followersList
        this.followingList = followingList
        this.numberOfFollowing = numberOfFollowing
    }

    static create = (o) => {
        const keys = ['name', 'email', 'description', 'id', 'numberOfEventsCreated', 'followersList', 'followingList', 'numberOfFollowers', 'numberOfFollowing', 'rating', 'profilePicture', 'joinDate', 'location']
        return new User(...keys.map(key => o[key]))
    }
}