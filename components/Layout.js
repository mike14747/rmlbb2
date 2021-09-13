import useSWR from 'swr';
import PropTypes from 'prop-types';
import Loading from './Loading';

const fetcher = (url) => fetch(url).then((res) => res.json());

import TopInfo from './TopInfo';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const { data: settings, error } = useSWR('/api/settings', fetcher);

    if (error) return <h1>An error has occurred!</h1>;
    if (!settings) return <Loading />;

    return (
        <>
            <TopInfo setting={settings} />
            <Header />

            <main className="main-container">
                {children}
            </main>

            <Footer contactEmail={settings.find(setting => setting.name === 'Contact Email')} />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
