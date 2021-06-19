import PropTypes from 'prop-types';
import Radium from 'radium';
import React from 'react';
import { nullFn } from '../../lib/object';
import { hexToRGB } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/Button.module.scss';

const createStyle = (props) => ({
    base: {
        backgroundColor: props.hasBorder ? 'white' : props.color,
        color: props.hasBorder ? props.color : 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: props.hasBorder ? props.color : 'transparent',
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
    },
    borderless: {
        ':hover': {
            color: 'white',
            backgroundColor: props.color,
        },
    },
    normal: {
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        opacity: 0.85,
        ':hover': {
            opacity: 1,
            boxShadow: `0 4px 16px 1px rgba(${hexToRGB(props.color).join(
                ','
            )},0.2)`,
        },
    },
});

function Button(props) {
    const innerStyle = createStyle(props);
    return (
        <div
            onClick={props.handleClick}
            className={combine(styles, 'component')}
            style={[
                innerStyle.base,
                innerStyle[props.hasBorder ? 'borderless' : 'normal'],
            ]}
        >
            {props.text}
        </div>
    );
}

Button.propTypes = {
    color: PropTypes.string.isRequired,
    hasBorder: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    borderRadius: PropTypes.number.isRequired,
    fontSize: PropTypes.number,
    handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    hasBorder: false,
    width: 120,
    height: 40,
    borderRadius: 6,
    fontSize: 20,
    handleClick: nullFn,
};

export default Radium(Button);
