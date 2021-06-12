import PropTypes from 'prop-types';
import React from 'react';
import User from '../../api/models/User';
import Colors from '../../lib/colors';
import { EmptyObject } from '../../lib/object';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/UserCard.module.scss';
import { FlexButton, Statistics } from '../components';

/**
 * @param {{user: User, isSessionUser: Boolean}} props
 * @returns
 */
function UserCard({ user, isSessionUser }) {
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
                        text='Chat'
                        color={Colors.primaryLight}
                        backgroundColor={Colors.white}
                        borderColor={Colors.gray}
                        handleClick={() => console.log('Chat')}
                    />
                    <div className={combine(styles, 'spacer')} />
                    <FlexButton
                        text='Follow'
                        color={Colors.white}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primary}
                        handleClick={() => console.log('Follow')}
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
    user: PropTypes.oneOfType([
        PropTypes.instanceOf(EmptyObject),
        PropTypes.instanceOf(User),
    ]).isRequired,
};

export default UserCard;
