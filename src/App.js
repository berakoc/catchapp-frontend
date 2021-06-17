import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import FirebaseAuthAPI from './api/firebase-auth';
import './App.scss';
import { Event, Frame, User } from './components/components';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { coalesce, is } from './lib/object';
import { AuthRoute, ProtectedRoute } from './lib/route';
import { decrypt, encrypt } from './lib/string';
import { fetchUser } from './redux/actions/user';

const mapStateToProps = ({ user }) => ({
    sessionUser: user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (user) => dispatch(fetchUser(user)),
});

const EnhancedUser = ({ isSessionUser }) => (
    <Frame component={<User isSessionUser={isSessionUser} />} />
);

function App({ sessionUser, fetchUser }) {
    useEffect(() => {
        FirebaseAuthAPI.init(fetchUser);
    }, [fetchUser]);
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/signup' component={Signup} />
            <AuthRoute path='/login' component={Login} />
            <ProtectedRoute
                path={`/dashboard`}
                component={() => (
                    <Dashboard
                        recovery={{
                            params: {
                                id: encrypt(coalesce(sessionUser, 'email')),
                            },
                        }}
                    />
                )}
            />
            <Route path={'/event/:id'} component={() => <Event />} />
            <ProtectedRoute
                path={'/user/:id'}
                component={({match}) => <EnhancedUser isSessionUser={is(decrypt(match.params.id), sessionUser.email)} />}
            />
        </Switch>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
