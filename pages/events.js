import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { getAllActiveUpcomingEvents, getAllActiveEvents } from '../lib/api/events';

import styles from '../styles/Events.module.css';

const Events = ({ events }) => {
    console.log('the whole component rerendered');
    const [allEvents, setAllEvents] = useState(null);
    const [showPastEvents, setShowPastEvents] = useState(false);

    useEffect(() => {
        if (showPastEvents && !allEvents) {
            getAllActiveEvents()
                .then(res => {
                    console.log(res);
                    setAllEvents(res);
                })
                .catch(error => console.log(error));
        }
    }, [showPastEvents, allEvents]);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Upcoming Events
                </title>
            </Head>
            <h2 data-testid="pageHeading" className="pageHeading">
                Upcoming Events
            </h2>
            <p onClick={() => setShowPastEvents(!showPastEvents)}>...include past events...</p>
            {events?.length > 0
                ? <article>
                    <ul>
                        {events.map((event, i) => (
                            <li key={i}>{event.eventDate} - {event.event}{event.details && <> ({event.details})</>}</li>
                        ))}
                    </ul>
                </article>
                : events?.length === 0
                    ? <article>
                        <p data-testid="empty">There are no upcoming events to display. Check back again soon.</p>
                    </article>
                    : <p data-testid="error">An error occurred fetching data.</p>
            }
        </>
    );
};

Events.propTypes = {
    events: PropTypes.array,
};

export async function getStaticProps() {
    const events = await getAllActiveUpcomingEvents();

    return {
        props: { events },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Events;
