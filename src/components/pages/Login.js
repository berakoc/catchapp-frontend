import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import combine from '../../lib/style-composer';
import { clearError, receiveError } from '../../redux/actions/error';
import styles from '../../styles/pages/Auth.module.scss';
import { LoginForm } from '../components';
import { values } from '../../lib/object';
import FirebaseAuthAPI from '../../api/firebase-auth';

const mapStateToProps = ({ error }) => ({
    error,
});

const mapDispatchToProps = (dispatch) => ({
    updateError: (e) => dispatch(receiveError(e)),
    clearError: () => dispatch(clearError()),
});

function Login({ error, updateError, clearError }) {
    useEffect(() => clearError(), [clearError])
    const handleSubmit = async (e) => {
        clearError()
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        };
        try {
            await FirebaseAuthAPI.login(...values(user));
            console.log('Logged in');
        } catch (err) {
            updateError(err);
        }
    };
    return (
        <div className={combine(styles, 'component')}>
            <LoginForm
                title='Login'
                error={error}
                handleSubmit={handleSubmit}
                clearError={clearError}
            />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
