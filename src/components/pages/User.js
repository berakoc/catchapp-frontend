import React from 'react';
import { connect } from 'react-redux';
import combine from '../../lib/style-composer';
import { logoutSession } from '../../redux/actions/session';
import styles from '../../styles/pages/User.module.scss';
import { UserCard } from '../components';
import FirebaseAuthAPI from '../../api/firebase-auth'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutSession()),
});

function User({ logout, isSpecial }) {
    const handleLogout = async () => {
        FirebaseAuthAPI.logout();
        await logout();
        console.log('Successfully logged out');
    };
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'content')}>
                <div className={combine(styles, 'card')}>
                    <UserCard isSpecial={isSpecial} />
                </div>
                <div className={combine(styles, 'events')}>Events</div>
            </div>
            <div className={combine(styles, 'navbar')}><button onClick={() => handleLogout()}>Logout</button></div>
        </div>
    );
}

User.propTypes = {
    isSpecial: PropTypes.bool.isRequired,
    logout: PropTypes.func
}

User.defaultProps = {
    isSpecial: false
}

export default connect(null, mapDispatchToProps)(User);