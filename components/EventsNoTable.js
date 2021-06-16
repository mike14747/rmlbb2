import PropTypes from 'prop-types';

import Loading from './Loading';

import styles from '../styles/EventsNoTable.module.css';

const EventsNoTable = ({ eventsArr, arePastEventsIncluded, isLoading }) => {
    const now = new Date();
    const offset = new Date().getTimezoneOffset();
    let formattedEvents = null;
    if (eventsArr?.length > 0) {
        formattedEvents = eventsArr.map(event => {
            return {
                eventDate: new Date(new Date(event.eventDate).getTime() + offset * 60000),
                event: event.event,
                details: event.details,
            };
        });
    } else if (eventsArr?.length === 0) {
        formattedEvents = [];
    }

    return (
        <>
            {isLoading
                ? <Loading />
                : formattedEvents?.length > 0
                    ? <article className={styles.table}>
                        <div className={styles.row + ' ' + styles.headingRow}>
                            <div className={styles.td + ' ' + styles.td1}>
                                Date
                            </div>
                            <div className={styles.td + ' ' + styles.td2}>
                                Event
                            </div>
                            <div className={styles.td}></div>
                        </div>

                        {formattedEvents.map((event, i) => (
                            <div key={i} className={styles.row + ' ' + styles.bodyRow}>
                                <div className={styles.td + ' ' + styles.td1}>
                                    {event.eventDate.toISOString().slice(0, 10)}
                                    {/* test date */}
                                </div>
                                <div className={styles.td + ' ' + styles.td2}>
                                    {event.event}{event.details && <span className={styles.details}> ({event.details})</span>}
                                </div>
                                <div className={styles.td + ' ' + styles.td3 + ' ' + styles.urgent}>
                                    {/* <div className={styles.urgent}>0</div> */}
                                    {Math.ceil((event.eventDate - now) / (1000 * 60 * 60 * 24))}
                                </div>
                            </div>
                        ))}
                    </article>
                    : formattedEvents?.length === 0
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

// const date1 = new Date();
// const offset = new Date().getTimezoneOffset();
// const date2 = new Date(new Date('2021-06-16').getTime() + offset * 60000);
// const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
