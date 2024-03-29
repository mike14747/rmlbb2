import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/EventsSidebar.module.css';
import sidebarStyles from '@/styles/Sidebar.module.css';

export default function EventsSidebar({ children }: { children: ReactNode }) {
    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.eventsCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h2 className={sidebarStyles.heading}>Events</h2>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h2 className={sidebarStyles.heading}>Upcoming Events</h2>
                        <p className={sidebarStyles.subHeading}>
                            Next 60 days
                        </p>
                    </div>

                    <div className={sidebarStyles.body}>
                        {children}

                        <div className={sidebarStyles.viewAll}>
                            <Link href="/events">
                                View all Events
                            </Link>

                            <Image
                                aria-hidden="true"
                                src="/images/calendar.png"
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                className={sidebarStyles.icon}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
