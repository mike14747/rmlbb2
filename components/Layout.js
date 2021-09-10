import PropTypes from 'prop-types';

import TopInfo from './TopInfo';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <TopInfo />
            <Header />

            <main className="main-container">
                {children}
            </main>

            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
