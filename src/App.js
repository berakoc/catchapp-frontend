import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import FirebaseAuthAPI from './api/firebase-auth';
import './App.scss';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import useUserId from './hooks/useUserId';
import { AuthRoute, ProtectedRoute } from './lib/route';
import { getSessionUser } from './redux/actions/session';

const mapDispatchToProps = (dispatch) => ({
    fetchSessionUser: (sessionUser) => dispatch(getSessionUser(sessionUser)),
});

function App(props) {
    const { fetchSessionUser } = props;
    const userId = useUserId()
    useEffect(() => {
        FirebaseAuthAPI.init(fetchSessionUser);
    }, [fetchSessionUser]);
    return (
        <>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRoute path='/login' component={Login} />
            {userId && <ProtectedRoute path={`/user/${userId}`} component={Dashboard} />}
        </>
    );
}

export default connect(null, mapDispatchToProps)(App);
