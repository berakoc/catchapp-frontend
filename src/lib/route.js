import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import useUserId from '../hooks/useUserId';

const mapStateToProps = ({ session }) => ({
    loggedIn: Boolean(session),
});

const Auth = ({ loggedIn, path, component: Component }) => {
    const userId = useUserId();
    return (
        <Route
            path={path}
            render={(props) =>
                loggedIn ? (
                    userId && <Redirect to={`/user/${userId}`} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

const Protected = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={(props) =>
            loggedIn ? <Component {...props} /> : <Redirect to='/login' />
        }
    />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
