import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import EventAPI from '../../api/event';
import { EventCard, Filter } from '../components';

const nullFunction = () => null;

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [pageId, setPageId] = useState(0);
    const [isEventsConsumed, setEventsConsumed] = useState(false);
    useEffect(() => {
        const fetchEventsByPageId = async () => {
            if (isEventsConsumed) return
            const fetchedEvents = await EventAPI.getEventPage(pageId);
            if (!fetchedEvents.length) {
                setEventsConsumed(true);
                return;
            }
            const fetchedIndexes = fetchedEvents.map(event => event.id) 
            setEvents([...events.filter(event => !~fetchedIndexes.indexOf(event.id)), ...fetchedEvents]);
            setPageId(pageId + 1);
        };
        fetchEventsByPageId();
    }, [pageId, isEventsConsumed, events]);
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
