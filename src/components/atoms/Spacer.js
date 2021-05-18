import React from 'react';
import PropTypes from 'prop-types';

function Spacer(props) {
    return (
        <div
            style={{
                height: props.size,
            }}
        />
    );
}

Spacer.propTypes = {
    size: PropTypes.number.isRequired,
};

export default Spacer;
