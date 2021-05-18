import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import FirebaseAuthAPI from './api/firebase-auth';
import UserAPI from './api/user';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { AuthRoute, ProtectedRoute } from './lib/route';
import { getSessionUser } from './redux/actions/session';

const mapDispatchToProps = (dispatch) => ({
    fetchSessionUser: (sessionUser) => dispatch(getSessionUser(sessionUser)),
});

function App(props) {
    const { fetchSessionUser } = props;
    useEffect(() => {
        FirebaseAuthAPI.init(fetchSessionUser);
        (async () => await UserAPI.getUser('bera@gmail.com'))()
    }, [fetchSessionUser]);
    return (
        <>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRoute path='/login' component={Login} />
            <ProtectedRoute path='/dashboard' component={Dashboard} />
        </>
    );
}

export default connect(null, mapDispatchToProps)(App);
