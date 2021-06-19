import User from './User';

export default class EnrichedUser {
    /**
     *
     * @param {import('./User').default} user
     * @param {Boolean} isFollowed
     */
    constructor(user, isFollowed) {
        this.user = user;
        this.isFollowed = isFollowed;
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
