import PropTypes from 'prop-types';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import Loading from '../components/Loading';
import { getAllActiveUpcomingEvents, getAllActivePastEvents } from '../lib/api/events';

import styles from '../styles/events.module.css';

const Events = ({ events }) => {
    const [pastEvents, setPastEvents] = useState(null);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showPastEvents && !pastEvents) {
            setIsLoading(true);
            const fetchPastEvents = async () => {
                const data = await fetch('/api/past-events')
                    .then(res => res.json())
                    .catch(error => console.log('My error logging:', error));
                if (data) {
                    setPastEvents(data);
                } else {
                    setPastEvents(null);
                }
                setIsLoading(false);
            };
            fetchPastEvents();
        }
    }, [showPastEvents, pastEvents]);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Events
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Events
                </h2>

                {!events && <p className="error">An error occurred fetching data.</p>}

                {events?.length === 0 && <p>There are no upcoming events to display. Check back again soon.</p>}

                {events?.length > 0 &&
                    <>
                        <p aria-hidden="true" className={styles.iconLegend}>
                            Urgency icons:<span className={styles.break}></span><span className={styles.td3 + ' ' + styles.urgent}>&#9679;</span> 0-2 | <span className={styles.td3 + ' ' + styles.soon}>&#9679;</span> 3-6 | <span className={styles.td3 + ' ' + styles.normal}>&#9679;</span> 7+ days until event.
                        </p>

                        <p className={styles.notice}>
                            Due dates are assumed to be due at midnight EST<span aria-hidden="true" className={styles.break}></span>(unless otherwise noted).
                        </p>

                        {events?.length > 0 &&
                            <div className={styles.eventsContainer}>
                                {events.map((event, index) => (
                                    <div key={index} className={styles.eventRow}>
                                        <div className={styles.eventDiv}>
                                            <h5 className={styles.eventDate}>{event.eventDate}</h5>
                                            <p className={styles.eventName}>{event.event}{event.details && <span className={styles.eventDetails}> ({event.details})</span>}</p>
                                        </div>
                                        <div className={styles.eventRight}>
                                            {event.daysUntil >= 7 && <p aria-label="Urgency level" title="Due in 7 or more days" className={styles.normal}>&#9679;</p>}
                                            {event.daysUntil > 2 && event.daysUntil < 7 && <p aria-label="Urgency level" title="Due in 3 to 6 days" className={styles.soon}>&#9679;</p>}
                                            {event.daysUntil <= 2 && <p aria-label="Urgency level" title="Due in 2 or less days" className={styles.urgent}>&#9679;</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </>
                }

                <div className={styles.showPastDiv}>
                    <button className={styles.showPast} onClick={() => setShowPastEvents(!showPastEvents)}>
                        <span aria-hidden="true" className={styles.showPastIcon}></span>
                        {!showPastEvents
                            ? <>Show past events.</>
                            : <>Hide past events.</>
                        }
                    </button>
                </div>

                {showPastEvents && !pastEvents && isLoading && <Loading />}
                {showPastEvents && !pastEvents && !isLoading && <p className={styles.error}>An error occurred fetching data.</p>}

                {showPastEvents && pastEvents?.length === 0 &&
                    <p>There are no past events to display. Check back again soon.</p>
                }
                {showPastEvents && pastEvents?.length > 0 &&
                    <div className={styles.pastTable}>
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
                    </div>
                }
            </article>
        </>
    );
};

Events.propTypes = {
    events: PropTypes.array,
};

export async function getStaticProps() {
    const events = await getAllActiveUpcomingEvents();

    return {
        props: { events },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Events;
