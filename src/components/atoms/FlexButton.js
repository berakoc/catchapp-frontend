import React from 'react';
import PropTypes from 'prop-types';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/FlexButton.module.scss';

function FlexButton(props) {
    return (
        <div
            style={{
                backgroundColor: props.backgroundColor,
                color: props.color,
                border: `2px solid ${props.borderColor}`,
                maxWidth: props.maxWidth,
            }}
            className={combine(styles, 'component')}
            onClick={() => props.handleClick()}
        >
            {props.text}
        </div>
    );
}

FlexButton.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    borderColor: PropTypes.string.isRequired,
    maxWidth: PropTypes.number.isRequired,
};

FlexButton.defaultProps = {
    maxWidth: 1000,
};

export default FlexButton;
