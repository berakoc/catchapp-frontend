import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { coalesce } from '../../lib/object';
import { encrypt } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/NavigationBar.module.scss';

/**
 * @typedef {import('../../api/models/User').default} User
 */
const mapStateToProps = ({ user }) => ({
    user,
});

/**
 * @param {{user: User, handleLogout: Function}} props
 */
function NavigationBar({ user, handleLogout, history }) {
    return (
        <div className={combine(styles, 'component')}>
            <div
                onClick={() =>
                    history.push(`/user/${encrypt(coalesce(user, 'email'))}`)
                }
                style={{
                    cursor: 'pointer',
                    backgroundColor: coalesce(user, 'profilePicture'),
                }}
                className={combine(styles, 'profilePicture')}
            />
            <div className={combine(styles, 'options')}>
                <Link to='/dashboard'>
                    <FontAwesomeIcon icon={faHome} />
                </Link>
                <FontAwesomeIcon onClick={handleLogout} icon={faSignOutAlt} />
            </div>
            <div className={combine(styles, 'null')}>Null</div>
        </div>
    );
}

NavigationBar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(NavigationBar);
