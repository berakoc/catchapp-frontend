import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import EventAPI from '../../api/event';
import useFlow from '../../hooks/useFlow';
import { coalesce } from '../../lib/object';
import { removeEvent } from '../../redux/actions/event';
import { EventCard, Filter } from '../components';

EventList.propTypes = {
    title: PropTypes.string.isRequired,
    isDashboard: PropTypes.bool.isRequired,
    userEmail: PropTypes.string,
};

const mapStateToProps = ({ event }) => ({
    event,
});

const mapDispatchToProps = (dispatch) => ({
    clearEvent: () => dispatch(removeEvent())
})

function EventList({ title, event, isDashboard, userEmail, clearEvent }) {
    const sessionUserEmail = useSelector(({ user }) => coalesce(user, 'email'));
    const [enrichedEvents, setEnrichedEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [isEnrichedEventsConsumed, setEnrichedEventsConsumed] =
        useState(false);
    const [pageId, setPageId] = useState(0);
    const eventListRef = useRef();
    const atomicLockRef = useRef(true);
    useFlow(
        400,
        () => setPageId((pageId) => pageId + 1),
        eventListRef,
        atomicLockRef
    );
    useEffect(() => {
        if (event) {
            setCreatedEvents([
                {
                    event: JSON.parse(event),
                    isLikedByTheGivenUser: false,
                    isTheGivenUserAttendee: false,
                },
                ...createdEvents,
            ]);
            clearEvent()
        }
        // eslint-disable-next-line
    }, [event]);
    useEffect(() => {
        const fetchEnrichedEventsByPageId = async () => {
            atomicLockRef.current = true;
            if (isEnrichedEventsConsumed) return;
            let fetchedEnrichedEvents = [];
            if (sessionUserEmail) {
                fetchedEnrichedEvents = await EventAPI[
                    isDashboard
                        ? 'getEnrichedEventPage'
                        : 'getCreatedEnrichedEventPage'
                ](
                    pageId,
                    sessionUserEmail,
                    !isDashboard ? userEmail : undefined
                );
            }
            if (!fetchedEnrichedEvents.length && sessionUserEmail) {
                setEnrichedEventsConsumed(true);
                return;
            }
            const fetchedIndexes = fetchedEnrichedEvents.map(
                (enrichedEvent) => enrichedEvent.event.id
            );
            setEnrichedEvents([
                ...enrichedEvents.filter(
                    (enrichedEvent) =>
                        !~fetchedIndexes.indexOf(enrichedEvent.event.id)
                ),
                ...fetchedEnrichedEvents,
            ]);
        };
        fetchEnrichedEventsByPageId().then(() => {
            atomicLockRef.current = false;
        });
        // eslint-disable-next-line
    }, [pageId, isEnrichedEventsConsumed, sessionUserEmail, userEmail]);
    return (
        <div ref={eventListRef}>
            <Filter title={title} />
            {createdEvents.map((enrichedEvent, index) => {
                const { event, ...metadata } = enrichedEvent;
                return (
                    <EventCard key={index} event={event} metadata={metadata} />
                );
            })}
            {enrichedEvents.map((enrichedEvent, index) => {
                const { event, ...metadata } = enrichedEvent;
                return (
                    <EventCard key={index} event={event} metadata={metadata} />
                );
            })}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
