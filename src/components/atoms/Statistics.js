import React from 'react';
import PropTypes from 'prop-types';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/Statistics.module.scss';
import { convertNumberToString } from '../../lib/string';

function Statistics(props) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'block')}>
                <div className={combine(styles, 'title')}>Events</div>
                <div className={combine(styles, 'content')}>
                    {convertNumberToString(props.numberOfEvents)}
                </div>
            </div>
            <div className={combine(styles, 'block')}>
                <div className={combine(styles, 'title')}>Followers</div>
                <div className={combine(styles, 'content')}>
                    {convertNumberToString(props.numberOfFollowers)}
                </div>
            </div>
        </div>
    );
}

Statistics.propTypes = {
    numberOfEvents: PropTypes.number.isRequired,
    numberOfFollowers: PropTypes.number.isRequired,
};

export default Statistics;
