import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import EventAPI from '../../api/event';
import UserAPI from '../../api/user';
import { is } from '../../lib/bool';
import Colors from '../../lib/colors';
import { coalesce, nullFn } from '../../lib/object';
import { convertNumberToString, getDateString, hexToRGB } from '../../lib/string';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/Event.module.scss';
import FlexButton from '../atoms/FlexButton';
import Spacer from '../atoms/Spacer';
import { Frame } from '../components';

/**
 * @param {{user: import('../../api/models/User.js').default}} props
 * @returns
 */
const User = ({ user, isSessionUser }) => {
    return (
        <div className={combine(styles, 'userCard')}>
            <div style={{
                backgroundColor: `rgba(${hexToRGB(user.profilePicture || '#fff').join(',')}, 0.4)`
            }} className={combine(styles, 'hero')} />
            <div className={combine(styles, 'content')}>
                <div
                    style={{ backgroundColor: user.profilePicture }}
                    className={combine(styles, 'circle')}
                />
                <div className={combine(styles, 'name')}>{user.name}</div>
                <div className={combine(styles, 'description')}>
                    {user.description}
                </div>
                {!isSessionUser && (
                    <>
                        <Spacer size={32} />
                        <FlexButton
                            text='Follow'
                            color={Colors.white}
                            backgroundColor={Colors.primary}
                            borderColor={Colors.primary}
                            handleClick={() => console.log('Follow')}
                        />
                    </>
                )}
                <Spacer size={24} />
                <div className={combine(styles, 'block')}>
                    <div className={combine(styles, 'blockTitle')}>Location</div>
                    <div className={combine(styles, 'blockContent')}>{user.location}</div>
                </div>
                <div>
                    <div className={combine(styles, 'blockTitle')}>Join Date</div>
                    <div  className={combine(styles, 'blockContent')}>{getDateString(new Date(user.joinDate))}</div>
                </div>
                <Spacer size={8} />
            </div>
        </div>
    );
};

/**
 * @param {{ event: import('../../api/models/Event').default, isSessionUser: Boolean}} props
 */
const EventCard = ({ event, sessionUser, metadata }) => {
    const [syntheticMetadata, setSyntheticMetadata] = useState(metadata);
    const [numberOfLikes, setNumberOfLikes] = useState(event.numberOfLikes);
    const [numberOfAttendees, setNumberOfAttendees] = useState(
        event.numberOfAttendees
    );
    const sessionUserEmail = coalesce(sessionUser, 'email');
    const isSessionUser = is(sessionUserEmail, event.creatorEmail);
    useEffect(() => {
        setSyntheticMetadata(metadata);
    }, [metadata]);
    return (
        <div className={combine(styles, 'eventCard')}>
            <div>
                <div className={combine(styles, 'reactionWrapper')}>
                    <div className={combine(styles, 'reaction')}>
                        <FontAwesomeIcon
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
                            className={combine(
                                styles,
                                syntheticMetadata.isLikedByTheGivenUser
                                    ? 'active'
                                    : 'inactive'
                            )}
                            icon={faHeart}
                        />
                        <div
                            className={combine(
                                styles,
                                syntheticMetadata.isLikedByTheGivenUser
                                    ? 'active'
                                    : 'inactive'
                            )}
                        >
                            {convertNumberToString(numberOfLikes)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={combine(styles, 'eventContent')}>
                <div className={combine(styles, 'info')}>
                    <div className={combine(styles, 'left')}>
                        <div className={combine(styles, 'title')}>
                            {event.title}
                        </div>
                        <Spacer size={48} />
                        <div className={combine(styles, 'startDate')}>
                            {getDateString(new Date(event.startDate))}
                        </div>
                        <Spacer size={24} />
                        <div className={combine(styles, 'description')}>
                            {event.description}
                        </div>
                        <Spacer size={24} />
                        <div className={combine(styles, 'numberOfAttendees')}>{`${convertNumberToString(numberOfAttendees)} ${is(numberOfAttendees, 1) ? 'person is' : 'people are'} joining this event`}</div>
                        <Spacer size={48} />
                        <div className={combine(styles, 'join')}>
                            <div className={combine(styles, 'endDateBlock')}>
                                <div
                                    className={combine(styles, 'endDateTitle')}
                                >
                                    Last Date
                                </div>
                                <div className={combine(styles, 'endDate')}>
                                    {getDateString(new Date(event.endDate))}
                                </div>
                            </div>
                            <FlexButton
                                text={syntheticMetadata.isTheGivenUserAttendee || isSessionUser ? 'Joined' : 'Join Event'}
                                color={Colors.white}
                                backgroundColor={Colors.green}
                                borderColor={Colors.green}
                                handleClick={isSessionUser
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
                                maxWidth={180}
                            />
                        </div>
                    </div>
                    <div className={combine(styles, 'right')}>
                        <div className={combine(styles, 'perkContainer')}>
                            <div className={combine(styles, 'perkTitle')}>
                                Perks
                            </div>
                            <Spacer size={12} />
                            <div className={combine(styles, 'perk')}>
                                {event.perk}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(function Event({ match }) {
    const sessionUser = useSelector(({ user }) => user);
    const eventId = match.params.id;
    const [enrichedEvent, setenrichedEvent] = useState({});
    const [user, setUser] = useState({});
    const isSessionUser = is(coalesce(sessionUser, 'id'), coalesce(user, 'id'));
    const fetchMetadata = (enrichedEvent) => {
        const { event, ...metadata } = enrichedEvent;
        return metadata;
    };
    useEffect(() => {
        EventAPI.getEnrichedEvent(eventId, coalesce(sessionUser, 'email')).then(
            async (enrichedEvent) => {
                setenrichedEvent(enrichedEvent);
                const user = await UserAPI.getUser(
                    enrichedEvent.event.creatorEmail
                );
                setUser(user);
            }
        );
    }, [eventId, sessionUser]);
    return (
        match.isExact && (
            <Frame
                component={
                    coalesce(enrichedEvent, 'event', 'id') ? (
                        <div className={combine(styles, 'component')}>
                            <div className={combine(styles, 'event')}>
                                <EventCard
                                    event={enrichedEvent.event}
                                    sessionUser={sessionUser}
                                    metadata={fetchMetadata(enrichedEvent)}
                                />
                            </div>
                            <div className={combine(styles, 'user')}>
                                {coalesce(enrichedEvent, 'event', 'id') && (
                                    <User
                                        user={user}
                                        isSessionUser={isSessionUser}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <span>
                            {Object.keys(enrichedEvent.event || {}).length
                                ? 'Event is not found'
                                : null}
                        </span>
                    )
                }
            />
        )
    );
});
