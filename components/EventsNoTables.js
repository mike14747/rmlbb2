import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Loading from './Loading';
import { getAllActivePastEvents } from '../lib/api/events';

import styles from '../styles/EventsNoTable.module.css';

const EventsNoTable = ({ events }) => {
    const [pastEvents, setPastEvents] = useState(null);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showPastEvents && !pastEvents) {
            setIsLoading(true);
            getAllActivePastEvents()
                .then(res => {
                    setPastEvents(res);
                })
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
        }
    }, [showPastEvents, pastEvents]);

    const now = new Date();
    const offset = new Date().getTimezoneOffset();

    if (events?.length > 0) {
        events.forEach(event => {
            event.eventDate = new Date(new Date(event.eventDate).getTime() + offset * 60000);
        });
    }

    return (
        <>
            {!events && <p data-testid="error">An error occurred fetching data.</p>}

            {events?.length === 0 &&
                <article>
                    <p data-testid="empty">There are no upcoming events to display. Check back again soon.</p>
                </article>
            }

            {events?.length > 0 &&
                <article className={styles.table}>
                    <div className={styles.row + ' ' + styles.headingRow}>
                        <div className={styles.td + ' ' + styles.td1}>
                            Date
                        </div>
                        <div className={styles.td + ' ' + styles.td2}>
                            Event
                        </div>
                        <div className={styles.td}></div>
                    </div>

                    {events.map((event, i) => (
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
            }

            <div className={styles.showPastDiv} onClick={() => setShowPastEvents(!showPastEvents)}>
                <span className={styles.showPast}>
                    {!showPastEvents
                        ? <>Show past events.</>
                        : <>Hide past events.</>
                    }
                </span>
            </div>

            {showPastEvents && !pastEvents && isLoading && <Loading />}
            {showPastEvents && !pastEvents && !isLoading && <p data-testid="pastError">An error occurred fetching data.</p>}

            {showPastEvents && pastEvents?.length === 0 &&
                <article>
                    <p data-testid="pastEmpty">There are no past events to display. Check back again soon.</p>
                </article>
            }
            {showPastEvents && pastEvents?.length > 0 &&
                <article className={styles.pastTable}>
                    <div className={styles.row + ' ' + styles.pastHeadingRow}>
                        <div className={styles.td + ' ' + styles.td1}>
                            Date
                        </div>
                        <div className={styles.td + ' ' + styles.td2}>
                            Past Event
                        </div>
                    </div>

                    {pastEvents.map((event, i) => (
                        <div key={i} className={styles.row + ' ' + styles.pastBodyRow}>
                            <div className={styles.td + ' ' + styles.td1}>
                                {event.eventDate}
                            </div>
                            <div className={styles.td + ' ' + styles.td2}>
                                {event.event}{event.details && <span className={styles.details}> ({event.details})</span>}
                            </div>
                        </div>
                    ))}
                </article>
            }
        </>
    );
};

EventsNoTable.propTypes = {
    events: PropTypes.array,
};

export default EventsNoTable;
