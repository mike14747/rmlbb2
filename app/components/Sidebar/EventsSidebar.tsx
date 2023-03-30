import { ReactNode } from 'react';

import styles from '../../../styles/EventsSidebar.module.css';
import sidebarStyles from '../../../styles/Sidebar.module.css';

export default async function EventsSidebar({ children }: { children: ReactNode }) {
    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.eventsCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h4 className={sidebarStyles.heading}>Events</h4>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h4 className={sidebarStyles.heading}>Upcoming Events</h4>
                        <p className={sidebarStyles.subHeading}>
                            Next 60 days
                        </p>
                    </div>

                    {children}
                </div>
            </section>
        </div>
    );
}
