import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import FirebaseAuthAPI from './api/firebase-auth';
import './App.scss';
import { Event, Frame, User } from './components/components';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { coalesce } from './lib/object';
import { AuthRoute, ProtectedRoute } from './lib/route';
import { encrypt } from './lib/string';
import { fetchUser } from './redux/actions/user';

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (user) => dispatch(fetchUser(user)),
});

const EnhancedUser = ({ sessionUser }) => (
    <Frame component={<User sessionUser={sessionUser} />} />
);

function App({ user, fetchUser }) {
    useEffect(() => {
        FirebaseAuthAPI.init(fetchUser);
    }, [fetchUser]);
    return (
        <>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRoute path='/login' component={Login} />
            <ProtectedRoute
                path={`/dashboard`}
                component={() => (
                    <Dashboard
                        recovery={{
                            params: {
                                id: encrypt(coalesce(user, 'email')),
                            },
                        }}
                    />
                )}
            />
            <Route path={'/event/:id'} render={Event} />
            <Route
                path={'/user/:id'}
                render={() => <EnhancedUser sessionUser={user} />}
            />
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
