import useSWR from 'swr';
import PropTypes from 'prop-types';
import Loading from './Loading';

const fetcher = (url) => fetch(url).then((res) => res.json());

import TopInfo from './TopInfo';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const { data: settings, error: error1 } = useSWR('/api/settings', fetcher);
    const { data: topInfo, error: error2 } = useSWR('/api/topinfo', fetcher);
    const { data: links, error: error3 } = useSWR('/api/links', fetcher);

    if (error1 || error2 || error3) return <h1>An error has occurred!</h1>;
    if (!settings || !topInfo || !links) return <Loading />;

    return (
        <>
            <TopInfo topInfo={topInfo} />
            <Header />

            <main className="main-container">
                {children}
            </main>

            <Footer contactEmail={settings.find(setting => setting.name === 'Contact Email').value} links={links} />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
