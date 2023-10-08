import { ReactNode } from 'react';
import Link from 'next/link';
import ParagraphRound from '@/assets/paragraphRound.svg';

import styles from '@/styles/BoardSidebar.module.css';
import sidebarStyles from '@/styles/Sidebar.module.css';

export default function BoardSidebar({ children }: { children: ReactNode }) {
    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.boardCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h2 className={sidebarStyles.heading}>Posts</h2>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h2 className={sidebarStyles.heading}>Recent Posts</h2>
                        <p className={sidebarStyles.subHeading}>
                            Most recent 5
                        </p>
                    </div>

                    <div className={sidebarStyles.body}>
                        {children}
                    </div>

                    <div className={sidebarStyles.viewAll}>
                        <Link href="/forum">
                            Go to the Forum
                        </Link>

                        <ParagraphRound aria-hidden="true" className={sidebarStyles.icon2} />
                    </div>
                </div>

            </section>
        </div>
    );
}
