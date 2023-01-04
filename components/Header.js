import PropTypes from 'prop-types';
import Link from 'next/link';
import TopInfo from './TopInfo';
import Authbar from './Authbar';
import Nav from './Nav';

import styles from '../styles/Header.module.css';

export default function Header({ topInfoText, topInfoActive }) {
    return (
        <header className={'container'}>
            <TopInfo topInfo={{ text: topInfoText, active: topInfoActive }} />

            <Authbar />

            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logoContainer}>
                        <Link href="/" passHref>
                            <img src="/images/logo1.png" alt="RML Baseball" className={styles.logo} />
                        </Link>
                    </div>
                    <div>
                        <h1 className={styles.heading}>
                            RML Baseball
                        </h1>
                        <p className={styles.subHeading}>
                            Since 1978
                        </p>
                    </div>
                </div>

                <Nav />
            </div>
        </header >
    );
}

Header.propTypes = {
    topInfoText: PropTypes.string,
    topInfoActive: PropTypes.bool,
};
