import Head from 'next/head';

import styles from '../styles/CurrentSeason.module.css';

const CurrentSeason = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Current Season
                </title>
            </Head>

            <main>
                <h2 data-testid="pageHeading" className="pageHeading">
                    Current Season
                </h2>
            </main>
        </>
    );
};

export default CurrentSeason;
