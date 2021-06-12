import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EventAPI from '../../api/event';
import useFlow from '../../hooks/useFlow';
import { coalesce } from '../../lib/object';
import { EventCard, Filter } from '../components';

const nullFunction = () => null;

export default function EventList() {
    const sessionUserEmail = useSelector(({ user }) => coalesce(user, 'email'));
    const [enrichedEvents, setEnrichedEvents] = useState([]);
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
        const fetchEnrichedEventsByPageId = async () => {
            atomicLockRef.current = true;
            if (isEnrichedEventsConsumed) return;
            let fetchedEnrichedEvents = [];
            if (sessionUserEmail) {
                fetchedEnrichedEvents = await EventAPI.getEnrichedEventPage(
                    pageId,
                    sessionUserEmail
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
    }, [pageId, isEnrichedEventsConsumed, sessionUserEmail]);
    return (
        <div ref={eventListRef}>
            <Filter
                title='Events'
                names={['Feed', 'Week', 'Month', 'Year', 'All', 'Latest']}
                filters={Array(6).fill(nullFunction)}
            />
            {enrichedEvents.map((enrichedEvent, index) => {
                const { event, ...metadata } = enrichedEvent;
                return (
                    <EventCard key={index} event={event} metadata={metadata} />
                );
            })}
        </div>
    );
}
