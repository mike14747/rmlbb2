import PropTypes from 'prop-types';

import styles from '../styles/EventsSidebar.module.css';

const EventsSidebar = ({ events }) => {
    return (
        <section>
            <h4 className={styles.eventsHeading}>Upcoming Events</h4>
            {!events && <p>An error occurred fetching data.</p>}
            {events?.length === 0 && <p>There are no upcoming events to display. Check back again soon.</p>}

            {events?.length > 0 &&
                events.map((event, index) => (
                    <div key={index} className={styles.eventDiv}>
                        <p className={styles.eventDate}>{event.eventDate}</p>
                        <p className={styles.eventDetails}>{event.event}</p>
                    </div>
                ))
            }

        </section>
    );
};

EventsSidebar.propTypes = {
    events: PropTypes.array,
};

export default EventsSidebar;
