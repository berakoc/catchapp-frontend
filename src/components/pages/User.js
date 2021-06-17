import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import UserModel from '../../api/models/User';
import UserAPI from '../../api/user';
import useAsync from '../../hooks/useAsync';
import { coalesce, nullFn } from '../../lib/object';
import { decrypt } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/User.module.scss';
import { EventList, UserCard } from '../components';

function User({ isSessionUser, isDashboard, match, recovery }) {
    const userEmail = decrypt(
        match.params.id || (recovery && recovery.params.id)
    );
    const [user, setUser] = useState(new UserModel());
    useAsync(
        () => UserAPI.getUser(userEmail),
        (user) => setUser(user),
        nullFn,
        [userEmail]
    );
    return (
        <div className={combine(styles, 'content', isDashboard ? 'dashboard' : 'user')}>
            <div className={combine(styles, isDashboard ? 'card' : 'userCard')}>
                <UserCard
                    user={UserModel.create(user)}
                    isSessionUser={isSessionUser}
                />
            </div>
            <div className={combine(styles, 'events')}>
                <EventList userEmail={coalesce(user, 'email')} isDashboard={isDashboard} title={isDashboard ? 'My Dashboard' : `${user.name && user.name.split(' ')[0]}'s Events`} />
            </div>
        </div>
    );
}

User.propTypes = {
    isSessionUser: PropTypes.bool.isRequired,
    isDashboard: PropTypes.bool.isRequired,
    recovery: PropTypes.object,
};

User.defaultProps = {
    isSessionUser: false,
    isDashboard: false
};

export default withRouter(User);
