import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../lib/colors';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/Auth.module.scss';
import AuthButton from '../atoms/AuthButton';
import Spacer from '../atoms/Spacer';
import { Input } from '../components';

export default function LoginForm(props) {
    return (
        <form
            autoComplete={'off'}
            className={combine(styles, 'form')}
            onSubmit={props.handleSubmit}
        >
            <div
                style={{
                    fontWeight: 600,
                    fontSize: 32,
                    color: Colors.primaryDark,
                }}
            >
                {props.title}
            </div>
            <Spacer size={32} />
            <div className={combine(styles, 'row')}>
                <Input label='Email' placeholder='Enter email address' />
                <Input
                    label='Password'
                    placeholder='Enter password'
                    isPassword
                />
            </div>
            <Spacer size={24} />
            <AuthButton text='Login' />
            <Spacer size={24} />
            <div
                style={{
                    color: Colors.red,
                    opacity: props.error ? 1 : 0,
                    userSelect: 'none',
                    wordWrap: 'break-word',
                    fontSize: 14,
                    width: 400,
                }}
            >
                {props.error || 'No error'}
            </div>
            <Spacer size={32} />
            <Link
                onClick={() => props.clearError()}
                className={combine(styles, 'helpLink')}
                to='/signup'
            >
                Not having an account?
            </Link>
            <Spacer size={24} />
            <Link to='/' className={combine(styles, 'goHome')}>
                <FontAwesomeIcon icon={faHome} size={'1x'} />
            </Link>
        </form>
    );
}

LoginForm.propTypes = {
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired,
};
