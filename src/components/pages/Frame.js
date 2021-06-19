import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FirebaseAuthAPI from '../../api/firebase-auth';
import debug from '../../lib/debug';
import combine from '../../lib/style-composer';
import { removeUser } from '../../redux/actions/user';
import styles from '../../styles/pages/Frame.module.scss';
import { EventButton, NavigationBar } from '../components';

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(removeUser()),
});

function Frame({ logout, component: Component }) {
    const history = useHistory();
    const handleLogout = async () => {
        await FirebaseAuthAPI.logout();
        await logout();
        history.push('/login');
        debug('Logged out');
    };
    return (
        <div className={combine(styles, 'component')}>
            {Component}
            <NavigationBar history={history} handleLogout={handleLogout} />
            <EventButton />
        </div>
    );
}

Frame.propTypes = {
    component: PropTypes.element.isRequired,
};

export default connect(null, mapDispatchToProps)(Frame);
