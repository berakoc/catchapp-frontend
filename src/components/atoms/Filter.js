import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

function Filter(props) {
    return (
        <div>
            <div>{props.title}</div>
            <div>
                {props.names.map((name, index) => (
                    <span key={nanoid()} onClick={props.filters[index]}>
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
