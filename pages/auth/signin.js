import PropTypes from 'prop-types';
import { getCsrfToken } from 'next-auth/client';
import Head from 'next/head';

import styles from '../../styles/signin.module.css';

const SignIn = ({ csrfToken }) => {
    console.log(csrfToken);
    return (
        <>
            <Head>
                <title>
                    Login
                </title>
            </Head>

            <h2 className="page-heading">Login</h2>

            <form method="post" action="/api/auth/callback/credentials" className={styles.form}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                <label>
                    Username
                    <input name="username" type="text" />
                </label>

                <label>
                    Password
                    <input name="password" type="password" />
                </label>

                <button type="submit" className={styles.submitButton}>Sign in</button>
            </form>
        </>
    );
};

SignIn.propTypes = {
    csrfToken: PropTypes.string,
};

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}

export default SignIn;
