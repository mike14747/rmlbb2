import styles from '@/styles/SidebarCard.module.css';
import { ReactNode } from 'react';

const colors = ['green', 'orange', 'blue', 'brown'];

type SidebarProps = {
    heading: string | null;
    subheading: string | null;
    color: string;
    children: ReactNode;
}

export default function SidebarCard({ heading = null, subheading = null, color, children }: SidebarProps) {
    const colorTheme = colors.includes(color) ? color : 'green';

    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} ${styles[`${colorTheme}`]}`}>
                <div className={styles.headingContainer}>
                    {heading && <h2 className={styles.heading}>{heading}</h2>}
                    <div className={styles.down}></div>
                </div>

                <div className={styles.belowHeading}>
                    {subheading && <p className={styles.subHeading}>{subheading}</p>}

                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
