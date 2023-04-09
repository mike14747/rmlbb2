import { getAllActiveUpcomingEvents } from '@/lib/api/events';
import CurrentEvents from '@/components/Events/CurrentEvents';
import PastEvents from '@/components/Events/PastEvents';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export const revalidate = 60;

export default async function Events() {
    const currentEventsData = await getAllActiveUpcomingEvents();

    return (
        <article className="mw-90ch">
            <h2 className="page-heading">
                Events
            </h2>

            <Suspense fallback={<Spinner />}>
                {currentEventsData
                    ? <CurrentEvents currentEventsData={currentEventsData} />
                    : <p className="error">An error occurred fetching data.</p>
                }
            </Suspense>

            <PastEvents />
        </article>
    );
}
