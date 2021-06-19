import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import EnrichedUserModel from '../../api/models/EnrichedUser';
import UserAPI from '../../api/user';
import useAsync from '../../hooks/useAsync';
import { is } from '../../lib/bool';
import { coalesce, nullFn } from '../../lib/object';
import { decrypt } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/User.module.scss';
import { EventList, UserCard } from '../components';

function User({ sessionUser, isDashboard, match, recovery }) {
    const userEmail = decrypt(
        match.params.id || (recovery && recovery.params.id)
    );
    const [enrichedUser, setEnrichedUser] = useState(new EnrichedUserModel());
    const isSessionUser = is(
        coalesce(sessionUser, 'email'),
        coalesce(enrichedUser, 'user', 'email')
    );
    useAsync(
        () =>
            UserAPI.getEnrichedUser(userEmail, coalesce(sessionUser, 'email')),
        (enrichedUser) => setEnrichedUser(enrichedUser),
        nullFn,
        [userEmail]
    );
    return (
        <div
            className={combine(
                styles,
                'content',
                isDashboard ? 'dashboard' : 'user'
            )}
        >
            <div className={combine(styles, isDashboard ? 'card' : 'userCard')}>
                <UserCard
                    enrichedUser={
                        new EnrichedUserModel(
                            EnrichedUserModel.create(enrichedUser.user || {}),
                            enrichedUser.isFollowed
                        )
                    }
                    isSessionUser={isSessionUser}
                    sessionUserEmail={coalesce(sessionUser, 'email')}
                />
            </div>
            <div className={combine(styles, 'events')}>
                <EventList
                    userEmail={coalesce(enrichedUser, 'user', 'email')}
                    isDashboard={isDashboard}
                    title={
                        isDashboard
                            ? 'My Dashboard'
                            : `${
                                  coalesce(enrichedUser.user, 'name') &&
                                  coalesce(enrichedUser.user, 'name').split(
                                      ' '
                                  )[0]
                              }'s Events`
                    }
                />
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
    isDashboard: false,
};

export default withRouter(User);
