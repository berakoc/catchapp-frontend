import React from 'react';
import PropTypes from 'prop-types';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/FlexButton.module.scss';
import { hexToRGB } from '../../lib/string';
import Radium from 'radium';

const fetchStyles = (props) => ({
    backgroundColor: props.backgroundColor,
    color: props.color,
    border: `2px solid ${props.borderColor}`,
    maxWidth: props.maxWidth,
    ':hover': {
        boxShadow: `0 2px 8px 1px rgba(${hexToRGB(props.backgroundColor).join(',')},0.2)`
    }
});

function FlexButton(props) {
    return (
        <div
            style={fetchStyles(props)}
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

export default Radium(FlexButton);
