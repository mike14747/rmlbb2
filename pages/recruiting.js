import Head from 'next/head';
// import Link from 'next/link';

import styles from '../styles/recruiting.module.css';

const Recruiting = () => {
    return (
        <>
            <Head>
                <title>
                    New Managers
                </title>
            </Head>

            <article className={styles.recruitingContainer}>
                <h2 className="page-heading">
                    New Managers
                </h2>

                <p>
                    The RML has an opening for a new manager.
                </p>

                <p>
                    There will be info about the league here and a link to contact me for more info.
                </p>
            </article>
        </>
    );
};

export default Recruiting;
