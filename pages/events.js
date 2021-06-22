import Head from 'next/head';
import PropTypes from 'prop-types';

import EventsNoTables from '../components/EventsNoTables';
import { getAllActiveUpcomingEvents } from '../lib/api/events';

const Events = ({ events }) => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Events
                </title>
            </Head>

            <main>
                <h2 data-testid="pageHeading" className="pageHeading">
                    Events
                </h2>

                <EventsNoTables events={events} />
            </main>
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
