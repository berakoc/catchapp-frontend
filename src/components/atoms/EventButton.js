import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import EventAPI from '../../api/event';
import useOutsideDetector from '../../hooks/useOutsideDetector';
import useWindowSize from '../../hooks/useWindowSize';
import Colors from '../../lib/colors';
import { error, info } from '../../lib/debug';
import { coalesce } from '../../lib/object';
import combine from '../../lib/style-composer';
import { fetchEvent } from '../../redux/actions/event';
import styles from '../../styles/atoms/EventButton.module.scss';
import { Input, Spacer, TextArea } from '../components';
import AuthButton from './AuthButton';
import VSpacer from './VSpacer';

const mapStateToProps = ({ user }) => ({
    userEmail: coalesce(user, 'email'),
});

const mapDispatchToProps = (dispatch) => ({
    fetchEvent: (event) => dispatch(fetchEvent(event)),
});

function EventButton({ userEmail, fetchEvent }) {
    const tooltipRef = useRef((node) => {
        if (node) {
            setToastLeft(
                -width / 2 -
                    toastRef.current.getBoundingClientRect().width / 2 +
                    120
            );
        }
    });
    const formRef = useRef();
    const toastRef = useRef();
    const [isToastActive, setToastActive] = useState(false);
    const [toastLeft, setToastLeft] = useState(0);
    const [isActive, setActive] = useState(false);
    const { width } = useWindowSize();
    useOutsideDetector(tooltipRef, setActive);
    useEffect(() => {
        setToastLeft(
            -width / 2 -
                toastRef.current.getBoundingClientRect().width / 2 +
                120
        );
    }, [width]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {
            creatorEmail: userEmail,
            title: e.target[0].value,
            location: e.target[1].value,
            description: e.target[2].value,
            startDate: new Date(e.target[3].value),
            endDate: new Date(e.target[4].value),
            perk: e.target[5].value,
        };
        try {
            fetchEvent(await EventAPI.createEvent(event));
            setActive(false);
            setToastActive(true);
            setTimeout(() => setToastActive(false), 2000);
            formRef.current.reset();
            info('Event is created');
        } catch (err) {
            error(err);
        }
    };
    return (
        <div className={combine(styles, 'component')}>
            <div
                ref={toastRef}
                style={{
                    left: `${toastLeft}px`,
                }}
                className={combine(
                    styles,
                    'toast',
                    isToastActive ? 'activeToast' : 'inactiveToast'
                )}
            >
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={'lg'}
                    color={Colors.green}
                />
                <VSpacer size={8} />
                <div>Event is successfully created</div>
            </div>
            <div
                style={{
                    pointerEvents: isActive ? 'none' : 'all',
                }}
                onClick={() => !isActive && setActive(!isActive)}
                className={combine(styles, 'icon')}
            >
                <FontAwesomeIcon
                    icon={faCalendarPlus}
                    color={isActive ? Colors.primary : Colors.primaryLight}
                />
            </div>
            <div
                ref={tooltipRef}
                className={combine(
                    styles,
                    'tooltip',
                    isActive ? 'active' : 'inactive'
                )}
            >
                <div className={combine(styles, 'title')}>Create An Event</div>
                <Spacer size={24} />
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className={combine(styles, 'row')}>
                        <Input
                            label='Title'
                            placeholder='Enter a fancy title'
                        />
                        <VSpacer size={16} />
                        <Input
                            label='Location'
                            placeholder='Tell about the place'
                        />
                    </div>
                    <Spacer size={24} />
                    <TextArea
                        label='Description'
                        placeholder='Tell others about it'
                    />
                    <Spacer size={24} />
                    <div className={combine(styles, 'row')}>
                        <Input label='Start Date' placeholder='' type='date' />
                        <VSpacer size={16} />
                        <Input label='End Date' placeholder='' type='date' />
                    </div>
                    <Spacer size={24} />
                    <div className={combine(styles, 'row')}>
                        <Input label='Perk' placeholder='What is your charm?' />
                    </div>
                    <Spacer size={24} />
                    <AuthButton text='Create' />
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EventButton);
