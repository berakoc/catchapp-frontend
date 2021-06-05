import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import { clearError, receiveError } from '../../redux/actions/error';
import { SignupForm } from '../components';
import styles from '../../styles/pages/Auth.module.scss';
import combine from '../../lib/style-composer';
import UserAPI from '../../api/user';
import debug from '../../lib/debug';
import { getRandomColor } from '../../lib/profile-picture';

const mapStateToProps = ({ error }) => ({
    error,
});

const mapDispatchToProps = (dispatch) => ({
    updateError: (e) => dispatch(receiveError(e)),
    clearError: () => dispatch(clearError()),
});

function Signup({ error, clearError, updateError }) {
    useEffect(() => clearError(), [clearError]);
    const handleSubmit = async (e) => {
        clearError();
        e.preventDefault();
        const user = {
            name: e.target[0].value,
            description: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
            profilePicture: getRandomColor(),
        };
        try {
            const { password, ...rest } = user;
            await UserAPI.createUser(rest);
            await FirebaseAuthAPI.signUp(...[user.email, user.password]);
            debug('A new user is created.');
        } catch (err) {
            updateError(err);
        }
    };
    return (
        <div className={combine(styles, 'component')}>
            <SignupForm
                title='Sign up'
                handleSubmit={handleSubmit}
                error={error}
                clearError={clearError}
            />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
