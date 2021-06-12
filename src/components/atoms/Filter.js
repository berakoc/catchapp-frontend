import PropTypes from 'prop-types';
import React from 'react';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/Filter.module.scss';

function Filter(props) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'title')}>{props.title}</div>
        </div>
    );
}

Filter.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Filter;
