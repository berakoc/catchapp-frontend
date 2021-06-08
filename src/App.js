import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import FirebaseAuthAPI from './api/firebase-auth';
import './App.scss';
import { Event } from './components/components';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { coalesce } from './lib/object';
import { AuthRoute, ProtectedRoute } from './lib/route';
import { fetchUser } from './redux/actions/user';

const mapStateToProps = ({ user }) => ({
    userId: coalesce(user, 'id'),
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (user) => dispatch(fetchUser(user)),
});

function App(props) {
    const { fetchUser } = props;
    useEffect(() => {
        FirebaseAuthAPI.init(fetchUser);
    }, [fetchUser]);
    return (
        <>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRoute path='/login' component={Login} />
            <ProtectedRoute path={`/dashboard`} component={Dashboard} />
            <Route path={'/event/:id'} render={Event} />
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
