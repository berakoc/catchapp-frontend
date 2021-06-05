import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import EventAPI from '../../api/event';
import useOutsideDetector from '../../hooks/useOutsideDetector';
import Colors from '../../lib/colors';
import { error } from '../../lib/debug';
import { coalesce } from '../../lib/object';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/EventButton.module.scss';
import { Input, Spacer, TextArea } from '../components';
import AuthButton from './AuthButton';

const mapStateToProps = ({user}) => ({
    userId: coalesce(user, 'id')
})

function EventButton({ userId }) {
    const clickRef = useRef();
    const [isActive, setActive] = useState(false);
    useOutsideDetector(clickRef, setActive);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {
            creatorId: userId,
            title: e.target[0].value,
            description: e.target[1].value,
            location: e.target[2].value,
            startDate: e.target[3].value,
            endDate: e.target[4].value,
            perk: e.target[5].value,
        };
        try {
            await EventAPI.createEvent(event);
        } catch(err) {
            setActive(false)
            error(err.message)
        }
    };
    return (
        <div className={combine(styles, 'component')}>
            <div
                onClick={() => setActive(!isActive)}
                className={combine(styles, 'icon')}
            >
                <FontAwesomeIcon
                    icon={faCalendarPlus}
                    color={isActive ? Colors.primary : Colors.primaryLight}
                />
            </div>
            <div
                ref={clickRef}
                className={combine(
                    styles,
                    'tooltip',
                    isActive ? ':null' : 'invisible'
                )}
            >
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
                    <Input label='Start Date' placeholder='' type='date' />
                    <Spacer size={24} />
                    <Input label='End Date' placeholder='' type='date' />
                    <Spacer size={24} />
                    <Input
                        label='Perk'
                        placeholder='What bonus do you offer?'
                    />
                    <Spacer size={48} />
                    <AuthButton text='Create' />
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(EventButton)