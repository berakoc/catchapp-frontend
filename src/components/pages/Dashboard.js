import React from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import debug from '../../lib/debug';
import combine from '../../lib/style-composer';
import { removeUser } from '../../redux/actions/user';
import styles from '../../styles/pages/Dashboard.module.scss';
import { EventButton, NavigationBar, User } from '../components';

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(removeUser()),
});

function Dashboard({ logout }) {
    const handleLogout = async () => {
        await FirebaseAuthAPI.logout();
        await logout();
        debug('Logged out.');
    };
    return (
        <div className={combine(styles, 'component')}>
            <User isSpecial />
            <NavigationBar handleLogout={handleLogout} />
            <EventButton />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(Dashboard);
