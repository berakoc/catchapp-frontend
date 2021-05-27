import PropTypes from 'prop-types';
import React from 'react';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/User.module.scss';
import { UserCard } from '../components';

function User({ isSpecial }) {
    return (
        <div className={combine(styles, 'content')}>
            <div className={combine(styles, 'card')}>
                <UserCard isSpecial={isSpecial} />
            </div>
            <div className={combine(styles, 'events')}>Events</div>
        </div>
    );
}

User.propTypes = {
    isSpecial: PropTypes.bool.isRequired,
};

User.defaultProps = {
    isSpecial: false,
};

export default User;
