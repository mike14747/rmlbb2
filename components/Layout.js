import useSWR from 'swr';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Error from './Error';
import TopInfo from './TopInfo';
import Authbar from './Authbar';
import Header from './Header';
import Footer from './Footer';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Layout = ({ children }) => {
    const { data: settings, error } = useSWR('/api/settings', fetcher);

    if (error) return <Error />;
    if (!settings) return <Loading />;

    return (
        <>
            <TopInfo topInfo={{ text: settings?.topInfoText, active: settings?.topInfoActive }} />
            <Authbar />
            <Header />

            <main className="main-container">
                {children}
            </main>

            <Footer contactEmail={settings?.contactEmail} links={settings?.links} />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
