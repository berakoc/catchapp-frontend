import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Colors from '../../lib/colors';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/EventButton.module.scss';
import { Input, Spacer, TextArea } from '../components';
import AuthButton from './AuthButton';

export default function EventButton() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Handled the form');
    };
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'icon')}>
                <FontAwesomeIcon
                    icon={faCalendarPlus}
                    color={Colors.primaryLight}
                />
            </div>
            <div className={combine(styles, 'tooltip')}>
                <div className={combine(styles, 'title')}>Create An Event</div>
                <Spacer size={24} />
                <form onSubmit={handleSubmit}>
                    <Input label='Title' placeholder='Enter a fancy title' />
                    <Spacer size={24} />
                    <TextArea
                        label='Description'
                        placeholder='Tell others about it'
                    />
                    <Spacer size={24} />
                    <Input
                        label='Location'
                        placeholder='Tell about the place'
                    />
                    <Spacer size={24} />
                    <AuthButton text='Create' />
                </form>
            </div>
        </div>
    );
}
