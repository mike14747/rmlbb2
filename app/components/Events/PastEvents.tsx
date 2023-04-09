'use client';

import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Button from '../Button';
import { EventItemClient } from '@/types/event-types';

import styles from '@/styles/events.module.css';

export default function PastEvents() {
    const [pastEvents, setPastEvents] = useState<EventItemClient[] | null>(null);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const btnText = !showPastEvents ? 'Show Past Events' : 'Hide Past Events';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showPastEvents && !pastEvents) {
            setIsLoading(true);
            (async () => {
                const data = await fetch('/api/events/past-events')
                    .then(res => res.json())
                    .catch(error => console.log(error));
                data ? setPastEvents(data) : setPastEvents(null);
                setIsLoading(false);
            })();
        }
    }, [showPastEvents, pastEvents]);

    return (
        <>
            <div className={styles.showPastDiv}>
                <Button onClick={() => setShowPastEvents(!showPastEvents)} size="medium" variant="contained" theme="primary">{btnText}</Button>
            </div>

            {showPastEvents && !pastEvents && isLoading && <Spinner size="large" />}
            {showPastEvents && !pastEvents && !isLoading && <p className={styles.error}>An error occurred fetching data.</p>}

            {
                showPastEvents && pastEvents?.length === 0 &&
                <p className="text-center">There are no past events to display. Check back again soon.</p>
            }
            {
                showPastEvents && pastEvents && pastEvents.length > 0 &&
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
                                {event.eventDateStr}
                            </div>
                            <div className={styles.td + ' ' + styles.td2}>
                                {event.event}{event.details && <><br /><span className={styles.eventDetails}> ({event.details})</span></>}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}
