import React from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import combine from '../../lib/style-composer';
import { logoutSession } from '../../redux/actions/session';
import styles from '../../styles/pages/Dashboard.module.scss';
import { EventButton, User } from '../components';

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutSession()),
});

function Dashboard({ logout }) {
    const handleLogout = async () => {
        FirebaseAuthAPI.logout();
        await logout();
        console.log('Successfully logged out');
    };
    return (
        <div className={combine(styles, 'component')}>
            <User isSpecial />
            <div className={combine(styles, 'navbar')}>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
            <EventButton />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(Dashboard);
