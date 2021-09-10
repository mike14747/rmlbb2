import { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/TopInfo.module.css';

const TopInfo = () => {
    const [showPanel, setShowPanel] = useState(true);

    return (
        <>
            {showPanel &&
                <div className={'container ' + styles.infoContainer}>
                    <div className={styles.content}>
                        The RML has an opening!
                        <span className={styles.moreInfoSpan}></span>
                        <Link href="/recruiting">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={styles.link}>
                                more info
                            </a>
                        </Link>
                    </div>

                    <button className={styles.close} onClick={() => setShowPanel(false)}>
                        &times;
                    </button>
                </div>
            }
        </>
    );
};

export default TopInfo;
