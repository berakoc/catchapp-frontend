import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import EnrichedUser from '../../api/models/EnrichedUser';
import UserAPI from '../../api/user';
import { is } from '../../lib/bool';
import Colors from '../../lib/colors';
import { coalesce, EmptyObject } from '../../lib/object';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/UserCard.module.scss';
import { FlexButton, Statistics } from '../components';

/**
 * @param {{enrichedUser: EnrichedUser, isSessionUser: Boolean, sessionUserEmail: String}} props
 * @returns
 */
function UserCard({ enrichedUser, isSessionUser, sessionUserEmail }) {
    const user = enrichedUser.user
    const [isFollowed, setFollowed] = useState(enrichedUser.isFollowed)
    useEffect(() => {
        if (is(isFollowed, undefined)) {
            setFollowed(enrichedUser.isFollowed)
        }
        // eslint-disable-next-line
    }, [enrichedUser.isFollowed])
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'info')}>
                <div
                    style={{
                        backgroundColor: user.profilePicture,
                    }}
                    className={combine(styles, 'image')}
                />
                <div className={combine(styles, 'block')}>
                    <div>
                        <div className={combine(styles, 'name')}>
                            {user.name}
                        </div>
                        <div className={combine(styles, 'title')}>
                            {user.title}
                        </div>
                    </div>
                    <Statistics
                        numberOfEvents={user.numberOfEventsCreated || 0}
                        numberOfFollowers={user.numberOfFollowers || 0}
                    />
                </div>
            </div>
            {!isSessionUser && (
                <div className={combine(styles, 'buttons')}>
                    <FlexButton
                        text={isFollowed ? 'Following' : 'Follow'}
                        color={Colors.white}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primary}
                        handleClick={async () => {
                            if (isFollowed) {
                                await UserAPI.deleteFollower(user.email, sessionUserEmail)
                                setFollowed(false)
                            } else {
                                await UserAPI.addFollower(user.email, sessionUserEmail)
                                setFollowed(true)
                            }
                        }}
                    />
                </div>
            )}
            <div
                className={combine(
                    styles,
                    'aboutTitle',
                    isSessionUser ? 'marginTop' : ':null'
                )}
            >
                About
            </div>
            <div className={combine(styles, 'about')}>{user.description}</div>
        </div>
    );
}

UserCard.propTypes = {
    isSessionUser: PropTypes.bool.isRequired,
    enrichedUser: PropTypes.oneOfType([
        PropTypes.instanceOf(EmptyObject),
        PropTypes.instanceOf(EnrichedUser),
    ]).isRequired,
};

export default UserCard;
