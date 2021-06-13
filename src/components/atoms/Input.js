import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Colors from '../../lib/colors';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/Input.module.scss';

function Input(props) {
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isInputActive, setInputActive] = useState(false)
    return (
        <div className={combine(styles, 'component')}>
            <div>
                <div className={combine(styles, 'wrapper')}>
                    <div
                        className={combine(
                            styles,
                            props.isPassword ? 'check' : ':null'
                        )}
                    >
                        <FontAwesomeIcon
                            onClick={() => setPasswordHidden(!isPasswordHidden)}
                            icon={faEye}
                            size={'1x'}
                            color={
                                isPasswordHidden
                                    ? Colors.primaryLight
                                    : Colors.primary
                            }
                        />
                    </div>
                    <div className={combine(styles, 'label', isInputActive ? 'activeLabel' : 'inactiveLabel')}>{props.label}</div>
                    <input
                        onBlur={() => setInputActive(false)}
                        onFocus={() => setInputActive(true)}
                        type={
                            props.isPassword
                                ? isPasswordHidden
                                    ? 'password'
                                    : 'text'
                                : props.type
                        }
                        placeholder={props.placeholder}
                        className={combine(styles, 'input')}
                    />
                </div>
            </div>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isPassword: PropTypes.bool.isRequired,
};

Input.defaultProps = {
    type: 'text',
    isPassword: false,
};

export default Input;
