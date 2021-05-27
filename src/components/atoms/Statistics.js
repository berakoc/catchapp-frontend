import React from 'react';
import PropTypes from 'prop-types';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/Statistics.module.scss';

function Statistics(props) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'block')}>
                <div className={combine(styles, 'title')}>Events</div>
                <div className={combine(styles, 'content')}>
                    {props.numberOfEvents}
                </div>
            </div>
            <div className={combine(styles, 'block')}>
                <div className={combine(styles, 'title')}>Followers</div>
                <div className={combine(styles, 'content')}>
                    {props.numberOfFollowers}
                </div>
            </div>
            <div className={combine(styles, 'block')}>
                <div className={combine(styles, 'title')}>Rating</div>
                <div className={combine(styles, 'content')}>{props.rating}</div>
            </div>
        </div>
    );
}

Statistics.propTypes = {
    numberOfEvents: PropTypes.number.isRequired,
    numberOfFollowers: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

export default Statistics;
