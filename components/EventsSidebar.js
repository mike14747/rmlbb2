import { useState, useEffect } from 'react';

import { getNextUpcomingEvents } from '../lib/api/events';
import Loading from './Loading';

import styles from '../styles/EventsSidebar.module.css';

const EventsSidebar = () => {
    console.log('EventsSidebar rerendered!');
    const [nextEvents, setNextEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getNextUpcomingEvents()
            .then(res => {
                setNextEvents(res);
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <aside className={styles.eventsSidebarContainer}>
            {isLoading && <Loading />}
            {!isLoading && !nextEvents && <p>An error occurred fetching data.</p>}
            {!isLoading && nextEvents?.length === 0 && <p>There are no events to display. Check back again soon.</p>}

            {nextEvents?.length > 0 &&
                nextEvents.map((event, index) => (
                    <div key={index}>{event.event}</div>
                ))
            }
        </aside>
    );
};

export default EventsSidebar;
