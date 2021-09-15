import PropTypes from 'prop-types';
import { Provider, getSession } from 'next-auth/client';
// import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';

import '../styles/globals.css';
import '../styles/my_tables.css';

function MyApp({ test, session, Component, pageProps }) {
    // console.log('test:', test?.property);
    // console.log('pageProps:', pageProps);
    // console.log('session in _app.js:', session);

    return (
        <>
            <Layout>
                <Provider session={session}>
                    <Component {...pageProps} />
                </Provider>

                {/* <Provider session={pageProps.session}>
                    <Component {...pageProps} />
                </Provider> */}
            </Layout>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any,
    test: PropTypes.object,
    session: PropTypes.object,
};

export default MyApp;

MyApp.getInitialProps = async (context) => {
    const session = await getSession(context);

    const test = {
        property: 'value',
    };

    return { test, session };
};
