import Head from 'next/head';
import PropTypes from 'prop-types';

import { getAllActiveUpcomingEvents } from '../lib/api/events';

import styles from '../styles/Events.module.css';

const Events = ({ events }) => {
    console.log(events);
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
            {events?.length > 0
                ? events.map((event, i) => (
                    <div key={i}>{event.eventDate} - {event.event}{event.details && <>({event.details})</>}</div>
                ))
                : <p>An error occurred fetching the upcoming events.</p>
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
