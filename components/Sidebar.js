import PropTypes from 'prop-types';
import EventsSidebar from '../components/EventsSidebar';
import BoardSidebar from '../components/BoardSidebar';

import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ events, posts }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.eventsSidebarContainer}>
                <EventsSidebar events={events} />
            </div>

            <div className={styles.boardSidebarContainer}>
                <BoardSidebar posts={null} />
            </div>
        </aside>
    );
};

Sidebar.propTypes = {
    events: PropTypes.array,
    posts: PropTypes.array,
};

export default Sidebar;
