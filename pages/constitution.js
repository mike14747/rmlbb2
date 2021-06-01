import Head from 'next/head';

import styles from '../styles/Constitution.module.css';

const Constitution = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Constitution
                </title>
            </Head>
            <h2 data-testid="pageHeading" className="pageHeading">
                Constitution
            </h2>
        </>
    );
};

export default Constitution;
