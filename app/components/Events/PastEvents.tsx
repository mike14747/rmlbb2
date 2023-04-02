'use client';

export default function PastEvents() {
    return (
        <>
            <p>Past events will go here.</p>

            {/* <div className={styles.showPastDiv}>
                <Button onClick={() => setShowPastEvents(!showPastEvents)} size="medium" variant="contained" theme="primary">{btnText}</Button>
            </div>

            {showPastEvents && !pastEvents && isLoading && <Loading />}
            {showPastEvents && !pastEvents && !isLoading && <p className={styles.error}>An error occurred fetching data.</p>}

            {
                showPastEvents && pastEvents?.length === 0 &&
                <p className="text-center">There are no past events to display. Check back again soon.</p>
            }
            {
                showPastEvents && pastEvents?.length > 0 &&
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
                                {event.event}{event.details && <><br /><span className={styles.eventDetails}> ({event.details})</span></>}
                            </div>
                        </div>
                    ))}
                </div>
            } */}
        </>
    );
}
