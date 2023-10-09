import { getAllActiveUpcomingEvents } from '@/lib/api/events';
import CurrentEvents from '@/components/Events/CurrentEvents';
import PastEvents from '@/components/Events/PastEvents';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

// export const revalidate = 60;

export default async function Events() {
    const currentEventsData = await getAllActiveUpcomingEvents();

    return (
        <main id="main">
            <article className="mw-90ch">
                <h1 className="page-heading">
                    Events
                </h1>

                <Suspense fallback={<Spinner />}>
                    {currentEventsData
                        ? <CurrentEvents currentEventsData={currentEventsData} />
                        : <p className="error">An error occurred fetching data.</p>
                    }
                </Suspense>

                <PastEvents />
            </article>
        </main>
    );
}
