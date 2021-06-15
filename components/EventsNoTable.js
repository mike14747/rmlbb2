import PropTypes from 'prop-types';

import Loading from './Loading';

import styles from '../styles/EventsNoTable.module.css';

const EventsNoTable = ({ eventsArr, arePastEventsIncluded, isLoading }) => {
    return (
        <>
            {isLoading
                ? <Loading />
                : eventsArr?.length > 0
                    ? <article>
                        <ul>
                            {eventsArr.map((event, i) => (
                                <li key={i}>{event.eventDate} - {event.event}{event.details && <> ({event.details})</>}</li>
                            ))}
                        </ul>
                    </article>
                    : eventsArr?.length === 0
                        ? <article>
                            <p data-testid="empty">There are no{!arePastEventsIncluded && <> upcoming</>} events to display. Check back again soon.</p>
                        </article>
                        : <p data-testid="error">An error occurred fetching data.</p>
            }
        </>
    );
};

EventsNoTable.propTypes = {
    eventsArr: PropTypes.array,
    arePastEventsIncluded: PropTypes.bool,
    isLoading: PropTypes.bool,
};

export default EventsNoTable;
