import PropTypes from 'prop-types';
import React, { useState } from 'react';
import combine from '../../lib/style-composer';
import genericStyles from '../../styles/atoms/Input.module.scss';
import styles from '../../styles/atoms/TextArea.module.scss';

function TextArea(props) {
    const [isTextAreaActive, setTextAreaActive] = useState(false)
    return (
        <div className={combine(genericStyles, 'component')}>
            <div className={combine(styles, 'wrapper')}>
            <div className={combine(genericStyles, 'label', isTextAreaActive ? 'activeLabel' : 'inactiveLabel')}>{props.label}</div>
            <textarea
                onFocus={() => setTextAreaActive(true)}
                onBlur={() => setTextAreaActive(false)}
                cols={props.numberOfColumns}
                placeholder={props.placeholder}
                className={combine(styles, 'textarea')}
            />
            </div>
        </div>
    );
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
};

TextArea.defaultProps = {
    type: 'text',
    numberOfColumns: 4,
};

export default TextArea;
