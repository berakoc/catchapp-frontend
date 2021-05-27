import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/atoms/Svg.module.scss';
import combine from '../../lib/style-composer';

function Svg(props) {
    return (
        <img
            width={props.size}
            src={props.src}
            alt={props.alt}
            className={combine(styles, 'component')}
        />
    );
}

Svg.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    alt: PropTypes.string.isRequired,
};

Svg.defaultProps = {
    alt: 'image',
};

export default Svg;
