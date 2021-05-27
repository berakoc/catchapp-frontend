import React from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import combine from '../../lib/style-composer';
import { logoutSession } from '../../redux/actions/session';
import styles from '../../styles/pages/Dashboard.module.scss';
import { UserCard } from '../components';

const mapStateToProps = ({ session }) => ({
    session,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutSession()),
});

function Dashboard({ session, logout }) {
    // const handleLogout = async () => {
    //     FirebaseAuthAPI.logout();
    //     await logout();
    //     console.log('Successfully logged out');
    // };
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'content')}>
                <div className={combine(styles, 'card')}>
                    <UserCard />
                </div>
                <div className={combine(styles, 'events')}>Events</div>
            </div>
            <div className={combine(styles, 'navbar')}>Navbar</div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
