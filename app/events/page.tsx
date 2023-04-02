import { getAllActiveUpcomingEvents } from '../../lib/api/events';
import CurrentEvents from '../components/Events/CurrentEvents';
import PastEvents from '../components/Events/PastEvents';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';

// import styles from '../../styles/events.module.css';

export default async function Events() {
    // const [pastEvents, setPastEvents] = useState(null);
    // const [showPastEvents, setShowPastEvents] = useState(false);
    // const btnText = !showPastEvents ? 'Show Past Events' : 'Hide Past Events';
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if (showPastEvents && !pastEvents) {
    //         setIsLoading(true);
    //         const fetchPastEvents = async () => {
    //             const data = await fetch('/api/past-events')
    //                 .then(res => res.json())
    //                 .catch(error => console.log('My error logging:', error));
    //             if (data) {
    //                 setPastEvents(data);
    //             } else {
    //                 setPastEvents(null);
    //             }
    //             setIsLoading(false);
    //         };
    //         fetchPastEvents();
    //     }
    // }, [showPastEvents, pastEvents]);

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
