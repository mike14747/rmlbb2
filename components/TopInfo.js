import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../components/Button';

import styles from '../styles/TopInfo.module.css';

const TopInfo = ({ topInfo }) => {
    const [showPanel, setShowPanel] = useState(true);

    return (
        <>
            {showPanel && topInfo?.active &&
                <aside aria-label="New Managers" className={'container ' + styles.infoContainer}>
                    <div className={styles.content}>
                        {topInfo?.text}
                        <span aria-hidden="true" className={styles.moreInfoSpan}></span>
                        <Link href="/recruiting">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={styles.link}>
                                more info
                            </a>
                        </Link>
                    </div>

                    <Button onClick={() => setShowPanel(false)} size="specialSize" variant="special">&times;</Button>
                </aside>
            }
        </>
    );
};

TopInfo.propTypes = {
    topInfo: PropTypes.object,
};

export default TopInfo;
