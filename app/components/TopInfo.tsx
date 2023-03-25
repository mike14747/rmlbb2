'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../components/Button';

import styles from '../../styles/TopInfo.module.css';

type TopInfoProps = {
    topInfo: {
        text: string;
        active: boolean;
    }
}

export default function TopInfo({ topInfo }: TopInfoProps) {
    const [showPanel, setShowPanel] = useState(true);

    return (
        <>
            {showPanel && topInfo?.active &&
                <aside aria-label="New Managers" className={'container ' + styles.infoContainer}>
                    <p className={styles.content}>
                        {topInfo?.text}
                        <Link href="/recruiting" className={styles.link + ' ' + styles.moreInfo}>
                            more info
                        </Link>
                    </p>

                    <Button onClick={() => setShowPanel(false)} size="specialSize" variant="special">&times;</Button>
                </aside>
            }
        </>
    );
}
