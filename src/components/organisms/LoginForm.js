import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Colors from '../../lib/colors'
import AuthButton from '../atoms/AuthButton'
import Spacer from '../atoms/Spacer'
import { Input, RadioButton } from '../components'

export default function LoginForm(props) {
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    return (
        <form onSubmit={props.handleSubmit}>
            <div style={{
                fontWeight: 600,
                fontSize: 32,
                color: Colors.primaryDark
            }}>{props.title}</div>
            <Spacer size={32} />
            <Input label='Email' placeholder='Enter your email address' />
            <Spacer size={24} />
            <Input type={isPasswordHidden ? 'password' : 'text'} label='Password' placeholder='Enter your password' />
            <Spacer size={16} />
            <RadioButton info='Show Password' handler={() => setPasswordHidden(!isPasswordHidden)} />
            <Spacer size={24} />
            <div style={{
                color: Colors.red,
                opacity: props.error ? 1 : 0,
                userSelect: 'none',
                wordWrap: 'break-word',
                fontSize: 14,
                width: 400
            }}>{props.error || 'No error'}</div>
            <Spacer size={24} />
            <AuthButton text='Login' />
        </form>
    )
}

LoginForm.propTypes = {
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}