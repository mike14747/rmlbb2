import EventsSidebar from './EventsSidebar';
import BoardSidebar from './BoardSidebar';

import styles from '../../../styles/Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.eventsSidebarContainer}>
                {/* @ts-expect-error Server Component */}
                <EventsSidebar />
            </div>

            <div className={styles.boardSidebarContainer}>
                <BoardSidebar />
            </div>
        </aside>
    );
}
