import Head from 'next/head';

import styles from '../styles/Events.module.css';

const Events = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Upcoming Events
                </title>
            </Head>
            <h2 data-testid="pageHeading" className="pageHeading">
                Upcoming Events
            </h2>
        </>
    );
};

export default Events;
