import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import EventsSidebar from './EventsSidebar';
import BoardSidebar from '../components/BoardSidebar';

const Layout = ({ children }) => {
    return (
        <>
            <Header />

            <div className="wrapper">
                <main className="main-container">{children}</main>
                <section className="sidebar">
                    <aside>
                        <EventsSidebar />
                    </aside>
                    <aside>
                        <BoardSidebar />
                    </aside>
                </section>
            </div>

            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
