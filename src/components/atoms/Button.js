import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/atoms/Button.module.scss';
import { combine } from '../../lib/style-resolver';
import Radium from 'radium';

const createStyle = (props) => ({
    base: {
        backgroundColor: props.hasBorder ? 'white' : props.color,
        color: props.hasBorder ? props.color : 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: props.hasBorder ? props.color : 'white',
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
    },
    borderless: {
        ':hover': {
            color: 'white',
            backgroundColor: props.color,
        },
    },
    normal: {
        opacity: 0.85,
        ':hover': {
            opacity: 1,
        },
    },
});

function Button(props) {
    const innerStyle = createStyle(props);
    return (
        <div
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
};

Button.defaultProps = {
    hasBorder: false,
    width: 120,
    height: 40,
    borderRadius: 6,
};

export default Radium(Button);
