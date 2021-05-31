import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/User.module.scss';
import { EventList, UserCard } from '../components';

function User({ isSpecial }) {
    useEffect(() => {
        console.log('Rendered')
    })
    return (
        <div className={combine(styles, 'content')}>
            <div className={combine(styles, 'card')}>
                <UserCard isSpecial={isSpecial} />
            </div>
            <div className={combine(styles, 'events')}><EventList /></div>
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
