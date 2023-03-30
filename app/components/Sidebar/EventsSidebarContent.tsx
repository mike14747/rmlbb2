import { Event } from '../../../types';
import Link from 'next/link';
import { getNextUpcomingEvents } from '../../../lib/api/events';

import styles from '../../../styles/EventsSidebar.module.css';
import sidebarStyles from '../../../styles/Sidebar.module.css';

export const revalidate = 600;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getEventsData() {
    await sleep(2000);
    return await getNextUpcomingEvents().catch(error => console.log(error.message));
}

export default async function EventsSidebarContent() {
    const eventsData: Promise<void | Event[] | null> = getEventsData();
    const events = await eventsData;

    return (
        <div className={sidebarStyles.body}>
            {!events && <p>An error occurred fetching data.</p>}

            {events?.length === 0 && <p>There are no upcoming events to display. Check back again soon.</p>}

            {events?.length && events?.length > 0 &&
                events.map((event, index) => (
                    <div key={index} className={styles.eventDiv}>
                        <h5 className={styles.eventDate}>{event.eventDate}</h5>
                        <p className={styles.eventName}>{event.event}</p>
                        {event.details && <p className={styles.eventDetails}> ({event.details})</p>}
                    </div>
                ))
            }

            <div className={sidebarStyles.viewAll}>
                <Link href="/events">
                    View all Events
                </Link>

                <img aria-hidden="true" src="/images/calendar.png" alt="" className={sidebarStyles.icon} />
            </div>
        </div>
    );
}
