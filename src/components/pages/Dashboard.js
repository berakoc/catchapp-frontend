import React from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import combine from '../../lib/style-composer';
import { removeUser } from '../../redux/actions/user';
import styles from '../../styles/pages/Dashboard.module.scss';
import { EventButton, User } from '../components';
import debug from '../../lib/debug'

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(removeUser()),
});

function Dashboard({ logout }) {
    const handleLogout = async () => {
        await FirebaseAuthAPI.logout();
        await logout();
        debug('Logged out.')
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
