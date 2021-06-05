import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import EventAPI from '../../api/event';
import { EventCard, Filter } from '../components';
import debug from '../../lib/debug'

const nullFunction = () => null;

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [pageId, setPageId] = useState(0);
    const [isEventsConsumed, setEventsConsumed] = useState(false);
    useEffect(() => {
        const fetchEventsByPageId = async () => {
            if (isEventsConsumed) return
            const fetchedEvents = await EventAPI.getEventPage(pageId);
            debug({fetchedEvents, pageId})
            if (!fetchedEvents.length) {
                setEventsConsumed(true);
                return;
            }
            setEvents([...events, ...fetchedEvents]);
            setPageId(pageId + 1);
        };
        fetchEventsByPageId();
        // eslint-disable-next-line
    }, [pageId, isEventsConsumed]);
    return (
        <div>
            <Filter
                title='Events'
                names={['Feed', 'Week', 'Month', 'Year', 'All', 'Latest']}
                filters={Array(6).fill(nullFunction)}
            />
            {events.map((event) => (
                <EventCard key={nanoid()} event={event} />
            ))}
        </div>
    );
}
