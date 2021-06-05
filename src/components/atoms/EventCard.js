import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/EventCard.module.scss';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Generates a date string
 * @param {Date} date 
 * @returns {String}
 */
const getDateString = date => `${monthNames[date.getMonth()]} ${date.getDay()} ${new Date().getFullYear() !== date.getFullYear() ? date.getFullYear() : ''}`

/**
 * @param {{event: import('../../api/models/Event').default}} props
 */
function EventCard({ event }) {
    const [creator] = useState({
        profilePicture: '#4895ef',
        fullName: 'Allie Thomson',
    });
    return <div className={combine(styles, 'component')}>
        <div className={combine(styles, 'creator')}>
            <div style={{
                backgroundColor: creator.profilePicture
            }} className={combine(styles, 'profilePicture')} />
            <div className={combine(styles, 'info')}>
                <div className={combine(styles, 'fullName')}>{creator.fullName}</div>
                <div className={combine(styles, 'endDate')}>{`${getDateString(new Date(event.startDate))} - ${getDateString(new Date(event.endDate))}`}</div>
            </div>
        </div>
        <div className={combine(styles, 'event')}>
            <div className={combine(styles, 'title')}>{event.title}</div>
            <div className={combine(styles, 'description')}>{event.description}</div>
            <div className={combine(styles, 'statistics')}>
                <div className={combine(styles, 'statistic')}>
                    <FontAwesomeIcon icon={farHeart} />
                    <div className={combine(styles, 'likes')}>{event.numberOfLikes}</div>
                </div>
            </div>
            <div></div>
        </div>
    </div>;
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventCard;
