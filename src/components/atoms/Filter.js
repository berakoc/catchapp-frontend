import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from '../../styles/atoms/Filter.module.scss'
import combine from '../../lib/style-composer';

function Filter(props) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'title')}>{props.title}</div>
            <div>
                {props.names.map((name, index) => (
                    <span className={combine(styles, 'item', !index ? 'active' : ':null')} key={nanoid()} onClick={props.filters[index]}>
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    title: PropTypes.string.isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    filters: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default Filter;
