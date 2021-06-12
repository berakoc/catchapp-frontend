import {
    faHeart as farHeart,
    faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserAPI from '../../api/user';
import useAsync from '../../hooks/useAsync';
import useIsOutside from '../../hooks/useIsOutside';
import { is } from '../../lib/bool';
import Colors from '../../lib/colors';
import { coalesce, compareProp, nullFn } from '../../lib/object';
import { encrypt, getDateString } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/EventCard.module.scss';

/**
 * @param {{event: import('../../api/models/Event').default}} props
 */
function EventCard({ event }) {
    const history = useHistory();
    const sessionUserEmail = useSelector(({ user }) => coalesce(user, 'email'));
    const [creator, setCreator] = useState(null);
    useAsync(
        async () => await UserAPI.getUser(event.creatorEmail),
        (user) => setCreator(user),
        nullFn,
        [event.id]
    );
    const cardRef = useRef();
    const deleteRef = useRef();
    const nameRef = useRef();
    const likeRef = useRef();
    const isOutsideOfName = useIsOutside(cardRef, nameRef);
    const isOutsideOfDelete = useIsOutside(cardRef, deleteRef);
    const isOutsideOfLike = useIsOutside(cardRef, likeRef);
    const isSessionUser = is(
        useSelector(({ user }) => coalesce(user, 'email')),
        event.creatorEmail
    );
    return (
        <div
            ref={cardRef}
            onClick={() => {
                if (
                    isOutsideOfLike &&
                    isOutsideOfName &&
                    (isOutsideOfDelete || !isSessionUser)
                ) {
                    history.push(`/event/${coalesce(event, 'id')}`);
                }
            }}
            className={combine(styles, 'component')}
        >
            <div className={combine(styles, 'header')}>
                <div className={combine(styles, 'creator')}>
                    <div
                        style={{
                            backgroundColor: coalesce(
                                creator,
                                'profilePicture'
                            ),
                        }}
                        className={combine(styles, 'profilePicture')}
                    />
                    <div className={combine(styles, 'info')}>
                        <div
                            onClick={() => {
                                history.push(
                                    is(sessionUserEmail, event.creatorEmail)
                                        ? '/dashboard'
                                        : `/user/${encrypt(event.creatorEmail)}`
                                );
                            }}
                            ref={nameRef}
                            className={combine(styles, 'fullName')}
                        >
                            {coalesce(creator, 'name')}
                        </div>
                        <div
                            className={combine(styles, 'endDate')}
                        >{`${getDateString(
                            new Date(coalesce(event, 'startDate'))
                        )} - ${getDateString(
                            new Date(coalesce(event, 'endDate'))
                        )}`}</div>
                    </div>
                </div>
                {isSessionUser && (
                    <div
                        ref={deleteRef}
                        className={combine(styles, 'delete')}
                        onClick={() => console.log('Deleted Event')}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            size={'sm'}
                            color={Colors.white}
                        />
                    </div>
                )}
            </div>
            <div className={combine(styles, 'event')}>
                <div className={combine(styles, 'title')}>{event.title}</div>
                <div className={combine(styles, 'description')}>
                    {event.description}
                </div>
                <div className={combine(styles, 'statistics')}>
                    <div ref={likeRef} className={combine(styles, 'statistic')}>
                        <FontAwesomeIcon
                            icon={farHeart}
                            onClick={() => console.log('Liked')}
                        />
                        <div className={combine(styles, 'likes')}>
                            {event.numberOfLikes}
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
};

export default memo(EventCard, compareProp('event', 'id'));
