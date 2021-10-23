import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';
import ManagerCard from '../components/ManagerCard';

import styles from '../styles/directory.module.css';

const Directory = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const [managers, setManagers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (session) {
            setIsLoading(true);

            fetch('/api/directory', { signal: abortController.signal })
                .then(res => res.json())
                .then(data => {
                    setManagers(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Data fetching was aborted!');
                    } else {
                        console.log('My error logging:', error);
                        setManagers(null);
                        setError('An error occurred fetching manager data.');
                        setIsLoading(false);
                    }
                });
        } else {
            setManagers(null);
        }

        return () => abortController.abort();
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Directory
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Directory
                </h2>

                {loading && <Loading />}

                {!session && <SignIn />}

                {session &&
                    <>
                        {error && <p className="error">{error}</p>}

                        {isLoading && <Loading />}

                        {managers?.length > 0 &&
                            <div className={styles.directoryContainer}>
                                {managers.map(conf => (
                                    <div key={conf.conference} className={styles.conferenceContainer}>
                                        <h3 className={styles.conferenceHeading}>
                                            {conf.conference} Conference
                                        </h3>
                                        {conf.divisions.map(div => (
                                            <div key={div.division} className={styles.divisionContainer}>
                                                <h4 className={styles.divisionHeading}>
                                                    <span className={styles.divisionPrefix}>Division: </span> {div.division}
                                                </h4>
                                                {div.teams.map(team => (
                                                    <ManagerCard key={team.team} manager={team} />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        }
                    </>
                }
            </article>
        </>
    );
};

export default Directory;
