import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Loading from './Loading';
import { getAllActivePastEvents } from '../lib/api/events';

import styles from '../styles/EventsNoTables.module.css';

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

    return (
        <>
            {!events && <p data-testid="error">An error occurred fetching data.</p>}

            {events?.length === 0 &&
                <article>
                    <p data-testid="empty">There are no upcoming events to display. Check back again soon.</p>
                </article>
            }

            {events?.length > 0 &&
                <article>
                    <p className={styles.iconLegend}>
                        Urgency icons: <span className={styles.td3 + ' ' + styles.urgent}></span> 0-2 | <span className={styles.td3 + ' ' + styles.soon}></span> 3-6 | <span className={styles.td3 + ' ' + styles.normal}></span> 7+ (days until event)
                    </p>

                    <p className={styles.notice}>
                        Due dates are assumed to be due at midnight EST (unless otherwise noted).
                    </p>

                    <div className={styles.table}>
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
                                    {event.eventDate}
                                </div>
                                <div className={styles.td + ' ' + styles.td2}>
                                    {event.event}{event.details && <span className={styles.details}> ({event.details})</span>}
                                </div>
                                <div className={styles.td}>
                                    <span className={event.daysUntil >= 7
                                        ? styles.normal
                                        : event.daysUntil <= 2
                                            ? styles.urgent
                                            : styles.soon}>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

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
                                {event.event}{event.details && <> ({event.details})</>}
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
