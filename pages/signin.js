import React from 'react';
import { getSession, providers, signIn } from 'next-auth/client';
import PropTypes from 'prop-types';

const SignIn = ({ providers }) => {
    return (
        <>
            <h2 className="pageHeading">Custom signin page.</h2>
        </>
    );
};

SignIn.propTypes = {
    providers: PropTypes.func,
};

SignIn.getInitialProps = async (context) => {
    const [req, res] = context;
    const session = await (getSession({ req }));

    if (session && res && session.accessToken) {
        res.writeHead(302, {
            location: '/',
        });
        return res.end();
    }

    return {
        session: undefined,
        providers: await providers(context),
    };
};

export default SignIn;
