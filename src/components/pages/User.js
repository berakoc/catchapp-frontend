import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import UserModel from '../../api/models/User';
import UserAPI from '../../api/user';
import useAsync from '../../hooks/useAsync';
import { nullFn } from '../../lib/object';
import { decrypt } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/User.module.scss';
import { EventList, UserCard } from '../components';

function User({ isSessionUser, match, recovery }) {
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
        <div className={combine(styles, 'content')}>
            <div className={combine(styles, 'card')}>
                <UserCard
                    user={UserModel.create(user)}
                    isSessionUser={isSessionUser}
                />
            </div>
            <div className={combine(styles, 'events')}>
                <EventList />
            </div>
        </div>
    );
}

User.propTypes = {
    isSessionUser: PropTypes.bool.isRequired,
    recovery: PropTypes.object,
};

User.defaultProps = {
    isSessionUser: false,
};

export default withRouter(User);
