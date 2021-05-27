import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../lib/colors';
import AuthButton from '../atoms/AuthButton';
import Spacer from '../atoms/Spacer';
import { Input, RadioButton, TextArea } from '../components';

export default function SignupForm(props) {
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    return (
        <form onSubmit={props.handleSubmit}>
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
            <Input label='Name' placeholder='Enter your full name' />
            <Spacer size={24} />
            <TextArea
                label='Description'
                placeholder='Tell us about yourself'
            />
            <Spacer size={24} />
            <Input label='Email' placeholder='Enter your email address' />
            <Spacer size={24} />
            <Input
                type={isPasswordHidden ? 'password' : 'text'}
                label='Password'
                placeholder='Enter your password'
            />
            <Spacer size={16} />
            <RadioButton
                info='Show Password'
                handler={() => setPasswordHidden(!isPasswordHidden)}
            />
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
            <Spacer size={24} />
            <AuthButton text='Sign up' />
            <Spacer size={32} />
            <Link
                onClick={() => props.clearError()}
                style={{
                    color: Colors.primaryDark,
                    textDecoration: 'none',
                    paddingBottom: 2,
                    borderBottom: `2px solid ${Colors.primary}`,
                }}
                to='/login'
            >
                Already have an account?
            </Link>
        </form>
    );
}

SignupForm.propTypes = {
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired,
};
