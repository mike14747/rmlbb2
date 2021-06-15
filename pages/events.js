import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import EventsNoTable from '../components/EventsNoTable';
import { getAllActiveUpcomingEvents, getAllActiveEvents } from '../lib/api/events';

import styles from '../styles/Events.module.css';

const Events = ({ events }) => {
    const [allEvents, setAllEvents] = useState(null);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showPastEvents && !allEvents) {
            setIsLoading(true);
            getAllActiveEvents()
                .then(res => {
                    setAllEvents(res);
                })
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
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

            <div className={styles.showPastDiv} onClick={() => setShowPastEvents(!showPastEvents)}>
                <span className={styles.showPast}>
                    {!showPastEvents
                        ? <>Include past events.</>
                        : <>Do not include past events.</>
                    }
                </span>
            </div>

            <EventsNoTable eventsArr={showPastEvents ? allEvents : events} arePastEventsIncluded={showPastEvents} isLoading={isLoading} />
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
