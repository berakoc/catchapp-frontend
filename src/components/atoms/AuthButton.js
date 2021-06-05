import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/atoms/AuthButton.module.scss';
import combine from '../../lib/style-composer';

function AuthButton({ text, handleClick }) {
    const clearInputs = (e) => {};
    return (
        <input
            onClick={() => {
                clearInputs();
                handleClick();
            }}
            type='submit'
            className={combine(styles, 'component')}
            value={text}
        />
    );
}

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

AuthButton.defaultProps = {
    handleClick: () => null,
};

export default AuthButton;
