import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/EventsSidebar.module.css';
import sidebarStyles from '../styles/Sidebar.module.css';

const EventsSidebar = ({ events }) => {
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

                    <div className={sidebarStyles.body}>
                        {!events && <p>An error occurred fetching data.</p>}

                        {events?.length === 0 && <p>There are no upcoming events to display. Check back again soon.</p>}

                        {events?.length > 0 &&
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
                </div>
            </section>
        </div>
    );
};

EventsSidebar.propTypes = {
    events: PropTypes.array,
};

export default EventsSidebar;
