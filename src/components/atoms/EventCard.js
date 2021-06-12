import {
    faHeart,
    faShareSquare,
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
import { coalesce, compareProp, EmptyObject, nullFn } from '../../lib/object';
import { convertNumberToString, encrypt, getDateString } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/EventCard.module.scss';
import EventAPI from '../../api/event';

/**
 * @param {{event: import('../../api/models/Event').default, metadata: {isLikedByTheGivenUser: boolean, isTheGivenUserAttendee: boolean}}} props
 */
function EventCard({ event, metadata }) {
    const history = useHistory();
    const sessionUserEmail = useSelector(({ user }) => coalesce(user, 'email'));
    const [creator, setCreator] = useState(null);
    const [syntheticMetadata, setSyntheticMetadata] = useState(metadata);
    const [numberOfLikes, setNumberOfLikes] = useState(event.numberOfLikes);
    const [numberOfAttendees, setNumberOfAttendees] = useState(
        event.numberOfAttendees
    );
    useAsync(
        async () => await UserAPI.getUser(event.creatorEmail),
        (user) => setCreator(user),
        nullFn,
        [event.id]
    );
    const cardRef = useRef();
    const deleteRef = useRef();
    const attendRef = useRef();
    const nameRef = useRef();
    const likeRef = useRef();
    const isOutsideOfName = useIsOutside(cardRef, nameRef);
    const isOutsideOfDelete = useIsOutside(cardRef, deleteRef);
    const isOutsideOfLike = useIsOutside(cardRef, likeRef);
    const isOutsideOfAttend = useIsOutside(cardRef, attendRef);
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
                    isOutsideOfAttend &&
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
                            className={combine(
                                styles,
                                syntheticMetadata.isLikedByTheGivenUser
                                    ? 'active'
                                    : 'inactive'
                            )}
                            icon={faHeart}
                            onClick={
                                isSessionUser
                                    ? nullFn
                                    : () => {
                                          if (
                                              syntheticMetadata.isLikedByTheGivenUser
                                          ) {
                                              EventAPI.removeLike(
                                                  event.id,
                                                  sessionUserEmail
                                              );
                                              setSyntheticMetadata({
                                                  ...syntheticMetadata,
                                                  isLikedByTheGivenUser: false,
                                              });
                                              setNumberOfLikes(
                                                  numberOfLikes - 1
                                              );
                                          } else {
                                              EventAPI.addLike(
                                                  event.id,
                                                  sessionUserEmail
                                              );
                                              setSyntheticMetadata({
                                                  ...syntheticMetadata,
                                                  isLikedByTheGivenUser: true,
                                              });
                                              setNumberOfLikes(
                                                  numberOfLikes + 1
                                              );
                                          }
                                      }
                            }
                        />
                        <div
                            className={combine(
                                styles,
                                'statisticsValue',
                                syntheticMetadata.isLikedByTheGivenUser
                                    ? 'active'
                                    : 'inactive'
                            )}
                        >
                            {convertNumberToString(numberOfLikes)}
                        </div>
                    </div>
                    <div
                        ref={attendRef}
                        className={combine(styles, 'statistic')}
                    >
                        <FontAwesomeIcon
                            className={combine(
                                styles,
                                syntheticMetadata.isTheGivenUserAttendee
                                    ? 'active'
                                    : 'inactive'
                            )}
                            fill={'#f00'}
                            icon={faShareSquare}
                            onClick={
                                isSessionUser
                                    ? nullFn
                                    : () => {
                                          if (
                                              syntheticMetadata.isTheGivenUserAttendee
                                          ) {
                                              EventAPI.removeUserFromEvent(
                                                  event.id,
                                                  sessionUserEmail
                                              );
                                              setSyntheticMetadata({
                                                  ...syntheticMetadata,
                                                  isTheGivenUserAttendee: false,
                                              });
                                              setNumberOfAttendees(
                                                  numberOfAttendees - 1
                                              );
                                          } else {
                                              EventAPI.addUserToEvent(
                                                  event.id,
                                                  sessionUserEmail
                                              );
                                              setSyntheticMetadata({
                                                  ...syntheticMetadata,
                                                  isTheGivenUserAttendee: true,
                                              });
                                              setNumberOfAttendees(
                                                  numberOfAttendees + 1
                                              );
                                          }
                                      }
                            }
                        />
                        <div
                            className={combine(
                                styles,
                                'statisticsValue',
                                syntheticMetadata.isTheGivenUserAttendee
                                    ? 'active'
                                    : 'inactive'
                            )}
                        >
                            {convertNumberToString(numberOfAttendees)}
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
    metadata: PropTypes.oneOfType([
        PropTypes.instanceOf(EmptyObject),
        PropTypes.shape({
            isLikedByTheGivenUser: PropTypes.bool.isRequired,
            isTheGivenUserAttendee: PropTypes.bool.isRequired,
        }),
    ]),
};

export default memo(EventCard, compareProp('event', 'id'));
