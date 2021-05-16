import React from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import { logoutSession } from '../../redux/actions/session';

const mapStateToProps = ({ session }) => ({
    session,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutSession()),
});

function Dashboard({ session, logout }) {
    const handleLogout = async () => {
        FirebaseAuthAPI.logout();
        await logout();
        console.log('Successfully logged out');
    };
    return (
        <>
            <h1>Hi {session.email}</h1>
            <p>You are logged in!</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
