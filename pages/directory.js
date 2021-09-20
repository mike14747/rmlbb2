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
    const [showSignin, setShowSignin] = useState(false);

    const [managers, setManagers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            const fetchManagers = async () => {
                const res = await fetch('/api/managers').catch(error => console.log(error));
                const data = await res.json();
                console.log('data in fetch call:', data);
                if (data) {
                    setManagers(data);
                    setError(null);
                } else {
                    setManagers(null);
                    setError('An error occurred fetching manager data.');
                }
            };

            fetchManagers();
        }

        !session ? setShowSignin(true) : setShowSignin(false);
    }, [session]);

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

                <SignIn showSignin={showSignin} />

                {session &&
                    <>
                        {error &&
                            <p className={styles.error}>
                                {error}
                            </p>
                        }
                        {managers?.length > 0 &&
                            <div className={styles.directoryContainer}>
                                {managers.map(conf => (
                                    <div key={conf.conference} className={styles.conferenceContainer}>
                                        <h3 className={styles.conferenceHeading}>
                                            {conf.conference}
                                        </h3>
                                        {conf.divisions.map(div => (
                                            <div key={div.division} className={styles.divisionContainer}>
                                                <h4 className={styles.divisionHeading}>
                                                    {div.division}
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
