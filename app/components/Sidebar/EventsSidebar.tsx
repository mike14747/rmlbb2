import EventsSidebarContent from './EventsSidebarContent';
import { getNextUpcomingEvents } from '../../../lib/api/events';
import { Event } from '../../../types';

import styles from '../../../styles/EventsSidebar.module.css';
import sidebarStyles from '../../../styles/Sidebar.module.css';

export const revalidate = false;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getEventsData() {
    console.log('first console.log');
    await sleep(2000);
    console.log('second console.log');
    return await getNextUpcomingEvents().catch(error => console.log(error.message));
}

export default async function EventsSidebar() {
    const eventsData: Promise<void | Event[] | null> = getEventsData();
    const events = await eventsData;

    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.eventsCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h4 className={sidebarStyles.heading}>Events</h4>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h4 className={sidebarStyles.heading}>Upcoming Events</h4>
                        <p className={sidebarStyles.subHeading}>
                            Next 60 days
                        </p>
                    </div>

                    {/* @ts-expect-error Server Component */}
                    <EventsSidebarContent events={events} />

                </div>
            </section>
        </div>
    );
}
