import PropTypes from 'prop-types';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';

import '../styles/globals.css';
import '../styles/my_tables.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

MyApp.propTypes = {
    session: PropTypes.object,
    Component: PropTypes.func,
    pageProps: PropTypes.any,
};

export default MyApp;
