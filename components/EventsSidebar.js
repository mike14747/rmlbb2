import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/EventsSidebar.module.css';

const EventsSidebar = ({ events }) => {
    return (
        <section className={styles.card}>
            <h4 className={styles.eventsHeading}>Upcoming Events</h4>
            {!events && <p>An error occurred fetching data.</p>}
            {events?.length === 0 && <p>There are no upcoming events to display. Check back again soon.</p>}

            {events?.length > 0 &&
                events.map((event, index) => (
                    <div key={index} className={styles.eventDiv}>
                        <h5 className={styles.eventDate}>{event.eventDate}</h5>
                        <p className={styles.eventDetails}>{event.event}</p>
                    </div>
                ))
            }

            <div className={styles.viewAll}>
                <Link href="/events">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        View all Events
                    </a>
                </Link>

                <img aria-hidden="true" src="/images/calendar.png" alt="" className={styles.icon} />
            </div>

        </section>
    );
};

EventsSidebar.propTypes = {
    events: PropTypes.array,
};

export default EventsSidebar;
