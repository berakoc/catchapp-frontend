import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FirebaseAuthAPI from '../../api/firebase-auth';
import UserAPI from '../../api/user';
import { info } from '../../lib/debug';
import { getRandomColor } from '../../lib/string';
import combine from '../../lib/style-composer';
import { clearError, receiveError } from '../../redux/actions/error';
import styles from '../../styles/pages/Auth.module.scss';
import { SignupForm } from '../components';

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
            location: e.target[1].value,
            description: e.target[2].value,
            email: e.target[3].value,
            password: e.target[4].value,
            profilePicture: getRandomColor(),
        };
        try {
            const { password, ...rest } = user;
            await UserAPI.createUser(rest);
            await FirebaseAuthAPI.signUp(...[user.email, user.password]);
            info('A new user is created');
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
