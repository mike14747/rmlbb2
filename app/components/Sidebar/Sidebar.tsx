import EventsSidebar from './EventsSidebar';
import BoardSidebar from './BoardSidebar';
import { SidebarProps } from '../../../types';

import styles from '../../../styles/Sidebar.module.css';

export default function Sidebar({ events, posts }: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.eventsSidebarContainer}>
                <EventsSidebar events={events} />
            </div>

            <div className={styles.boardSidebarContainer}>
                <BoardSidebar posts={posts} />
            </div>
        </aside>
    );
}
