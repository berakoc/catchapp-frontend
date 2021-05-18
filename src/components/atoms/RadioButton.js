import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/atoms/RadioButton.module.scss';
import combine from '../../lib/style-composer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from '../../lib/colors';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function RadioButton(props) {
    const [isActive, setActive] = useState(false);
    return (
        <div className={combine(styles, 'component')}>
            <div
                onClick={() => {
                    setActive(!isActive);
                    props.handler();
                }}
                className={combine(
                    styles,
                    'button',
                    isActive ? 'active' : ':null'
                )}
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    size={'xs'}
                    color={Colors.white}
                />
            </div>
            <div className={combine(styles, 'text')}>{props.info}</div>
        </div>
    );
}

RadioButton.propTypes = {
    info: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
};

export default RadioButton;
