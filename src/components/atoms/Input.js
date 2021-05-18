import PropTypes from 'prop-types'
import React from 'react'
import combine from '../../lib/style-composer'
import styles from '../../styles/atoms/Input.module.scss'

function Input(props) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'label')}>{props.label}</div>
            <input type={props.type} placeholder={props.placeholder} className={combine(styles, 'input')}></input>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

Input.defaultProps = {
    type: 'text'
}

export default Input

