import { getNextUpcomingEvents } from '@/lib/api/events';

import styles from '@/styles/EventsSidebar.module.css';

export const revalidate = 600;

export default async function EventsSidebarContent() {
    const events = await getNextUpcomingEvents();

    if (!events) return <p className="error">An error occurred fetching data.</p>;

    if (events.length === 0) return (
        <>
            <p>There are no upcoming events to display.</p>
            <p>Check back again soon.</p>
        </>
    );

    return (
        <>
            {events.map((event, index) => (
                <div key={index} className={styles.eventDiv}>
                    <h5 className={styles.eventDate}>{event.eventDateStr}</h5>
                    <p className={styles.eventName}>{event.event}</p>
                    {event.details && <p className={styles.eventDetails}> ({event.details})</p>}
                </div>
            ))}
        </>
    );
}
