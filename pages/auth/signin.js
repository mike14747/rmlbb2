import PropTypes from 'prop-types';
import { getCsrfToken } from 'next-auth/client';

const SignIn = ({ csrfToken }) => {
    return (
        <>
            <h2 className="pageHeading">Custom signin page.</h2>
            <form method='post' action='/api/auth/callback/credentials'>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <label>
                    Username
                    <input name='username' type='text' />
                </label>
                <label>
                    Password
                    <input name='password' type='password' />
                </label>
                <button type='submit'>Sign in</button>
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
