import React from 'react';
import PropTypes from 'prop-types';

function VSpacer({ size }) {
    return (
        <div
            style={{
                width: size,
            }}
        />
    );
}

VSpacer.propTypes = {
    size: PropTypes.number.isRequired,
};

export default VSpacer;
