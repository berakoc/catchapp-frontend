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
import { Input, TextArea } from '../components';

export default function SignupForm(props) {
    return (
        <form autoComplete={'off'} className={combine(styles, 'form')} onSubmit={props.handleSubmit}>
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
                <Input label='Name' placeholder='Your fullname please' />
                <Input label='Location' placeholder='Where do you live?' />
            </div>
            <Spacer size={24} />
            <TextArea
                label='Description'
                placeholder='Tell us about yourself'
            />
            <Spacer size={24} />
            <div className={combine(styles, 'row')}>
                <Input label='Email' placeholder='Email matters' />
                <Input
                    isPassword
                    label='Password'
                    placeholder='Give us your secret'
                />
            </div>

            <Spacer size={24} />
            <AuthButton text='Sign up' />
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
            <Link
                onClick={() => props.clearError()}
                className={combine(styles, 'helpLink')}
                to='/login'
            >
                Already have an account?
            </Link>
            <Spacer size={24} />
            <Link to='/' className={combine(styles, 'goHome')}><FontAwesomeIcon icon={faHome} size={'1s'} /></Link>
        </form>
    );
}

SignupForm.propTypes = {
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired,
};
