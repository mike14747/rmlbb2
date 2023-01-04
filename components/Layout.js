import useSWR from 'swr';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Error from './Error';
import SkipToMain from './SkipToMain';
import Header from './Header';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Layout = ({ children }) => {
    const { data: settings, error } = useSWR('/api/settings', fetcher);

    if (error) return <Error />;
    if (!settings) return <Loading />;

    return (
        <>
            <SkipToMain />

            <Header topInfoText={settings.topInfoText} topInfoActive={settings.topInfoActive} />

            <main id="main" className="main-container">
                {children}
                <ScrollTop />
            </main>

            <Footer contactEmail={settings?.contactEmail} links={settings?.links} />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
