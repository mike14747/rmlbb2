import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
// import SignInMini from './SignInMini';
import Button from '../components/Button';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const redirectUrl = window.location;

    return (
        <div className={'container-fluid ' + styles.authbarWrapper}>
            <div className={'container ' + styles.authbarContainer}>
                {loading && <>Loading...</>}

                {!session && !loading &&
                    // <>
                    //     <SignInMini />
                    // </>
                    <Link href={`/login?url=${redirectUrl}`}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a>Login</a>
                    </Link>
                }

                {session &&
                    <>
                        <span className={styles.username}>
                            <>User: </>
                            <Link href="/profile">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {session.user.name}
                                </a>
                            </Link>
                        </span>

                        <Button onClick={() => signOut({ redirect: false })} size="small" variant="text">Sign Out</Button>

                        {/* <Button onClick={() => signOut({ callbackUrl: `${window.location.origin}/forum` })} size="small" variant="text">Sign Out</Button> */}
                    </>
                }
            </div>
        </div>
    );
};

export default Authbar;
