import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/atoms/AuthButton.module.scss';
import combine from '../../lib/style-composer';

function AuthButton(props) {
    return (
        <input
            type='submit'
            className={combine(styles, 'component')}
            value={props.text}
        />
    );
}

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default AuthButton;
