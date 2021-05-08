import PropTypes from 'prop-types';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Layout>
                <Provider session={pageProps.session}>
                    <Component {...pageProps} />
                </Provider>
            </Layout>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any,
};

export default MyApp;
