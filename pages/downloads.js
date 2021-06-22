import Head from 'next/head';

import styles from '../styles/Downloads.module.css';

const Downloads = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Downloads
                </title>
            </Head>

            <main>
                <h2 data-testid="pageHeading" className="pageHeading">
                    Downloads
                </h2>
            </main>
        </>
    );
};

export default Downloads;
