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
};

TopInfo.propTypes = {
    topInfo: PropTypes.object,
};

export default TopInfo;
