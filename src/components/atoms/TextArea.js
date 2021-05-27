import PropTypes from 'prop-types';
import React from 'react';
import combine from '../../lib/style-composer';
import genericStyles from '../../styles/atoms/Input.module.scss';
import styles from '../../styles/atoms/TextArea.module.scss'

function TextArea(props) {
    return (
        <div className={combine(genericStyles, 'component')}>
            <div className={combine(genericStyles, 'label')}>{props.label}</div>
            <textarea
                cols={props.numberOfColumns}
                placeholder={props.placeholder}
                className={combine(styles, 'textarea')}
            />
        </div>
    );
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    numberOfColumns: PropTypes.number.isRequired
};

TextArea.defaultProps = {
    type: 'text',
    numberOfColumns: 4
};

export default TextArea;
