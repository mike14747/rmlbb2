import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Loading from '../components/Loading';
import { getAllActiveUpcomingEvents, getAllActivePastEvents } from '../lib/api/events';

import styles from '../styles/Events.module.css';

const Events = ({ events }) => {
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
            <Head>
                <title>
                    RML Baseball - Events
                </title>
            </Head>

            <main>
                <h2 data-testid="pageHeading" className="pageHeading">
                    Events
                </h2>

                {!events && <p data-testid="error" className={styles.error}>An error occurred fetching data.</p>}

                {events?.length === 0 &&
                    <article>
                        <p data-testid="empty">There are no upcoming events to display. Check back again soon.</p>
                    </article>
                }

                {events?.length > 0 &&
                    <article>
                        <p aria-hidden="true" className={styles.iconLegend}>
                            Urgency icons:<span className={styles.break}></span><span className={styles.td3 + ' ' + styles.urgent}>&#9679;</span> 0-2 | <span className={styles.td3 + ' ' + styles.soon}>&#9679;</span> 3-6 | <span className={styles.td3 + ' ' + styles.normal}>&#9679;</span> 7+ days until event.
                        </p>

                        <p className={styles.notice}>
                            Due dates are assumed to be due at midnight EST<span aria-hidden="true" className={styles.break}></span>(unless otherwise noted).
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
                                        {event.daysUntil >= 7 && <span aria-label="Urgency level" aria-description="Due in 7 or more days" title="Due in 7 or more days" className={styles.normal}>&#9679;</span>}
                                        {event.daysUntil > 2 && event.daysUntil < 7 && <span aria-label="Urgency level" aria-description="Due in 3 to 6 days" title="Due in 3 to 6 days" className={styles.soon}>&#9679;</span>}
                                        {event.daysUntil <= 2 && <span aria-label="Urgency level" aria-description="Due in 2 or less days" title="Due in 2 or less days" className={styles.urgent}>&#9679;</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </article>
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
                {showPastEvents && !pastEvents && !isLoading && <p data-testid="pastError" className={styles.error}>An error occurred fetching data.</p>}

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
            </main>
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
