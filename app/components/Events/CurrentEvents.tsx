import { Event } from '../../../types';

import styles from '../../../styles/events.module.css';

export default function CurrentEvents({ currentEventsData }: { currentEventsData: Event[]}) {
    return (
        <>
            {!currentEventsData && <p className="error">An error occurred fetching data.</p>}

            {currentEventsData?.length === 0 && <p className="text-center">There are no upcoming events to display. Check back again soon.</p>}

            {currentEventsData?.length > 0 &&
                <>
                    <p aria-hidden="true" className={styles.iconLegend}>
                        Urgency icons:<span className={styles.break}></span><span className={styles.td3 + ' ' + styles.urgent}>&#9679;</span> 0-2 | <span className={styles.td3 + ' ' + styles.soon}>&#9679;</span> 3-6 | <span className={styles.td3 + ' ' + styles.normal}>&#9679;</span> 7+ days until event.
                    </p>

                    <p className={styles.notice}>
                        Due dates are assumed to be due at midnight EST<span aria-hidden="true" className={styles.break}></span>(unless otherwise noted).
                    </p>

                    <div className={styles.eventsDiv}>
                        {currentEventsData.map((event, index) => (
                            <div key={index} className={styles.eventRow}>
                                <div className={styles.eventDiv}>
                                    <h5 className={styles.eventDate}>{event.eventDateStr}</h5>
                                    <p className={styles.eventName}>{event.event}</p>
                                    {event.details && <p className={styles.eventDetails}> ({event.details})</p>}
                                </div>
                                <div className={styles.eventRight}>
                                    {event.daysUntil >= 7 && <p aria-label="Urgency level" title="Due in 7 or more days" className={styles.normal}>&#9679;</p>}
                                    {event.daysUntil > 2 && event.daysUntil < 7 && <p aria-label="Urgency level" title="Due in 3 to 6 days" className={styles.soon}>&#9679;</p>}
                                    {event.daysUntil <= 2 && <p aria-label="Urgency level" title="Due in 2 or less days" className={styles.urgent}>&#9679;</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}
