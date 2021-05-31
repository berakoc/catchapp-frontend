import PropTypes from 'prop-types';
import React from 'react';

function EventCard(props) {
    return (
        <div
            style={{
                height: 400,
                backgroundColor: 'white',
            }}
        >
            {props.event.title}
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventCard;
