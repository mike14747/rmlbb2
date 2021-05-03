import Link from 'next/link';

import styles from '../styles/Header.module.css';
import navStyles from '../styles/Nav.module.css';

const Header = () => {
    return (
        <header className={'container ' + styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.heading}>
                    RML Baseball
                </h1>
                <div className={styles.subHeading}>
                    Since 1978
                </div>
            </div>

            <nav className={navStyles.nav}>
                <div className={navStyles.navdropdown}>
                    <div className={navStyles.navdropdownContent}>
                        <div className={navStyles.item}>
                            <Link href="/current">Current Season +</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/downloads">Downloads +</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/constitution">Constitution</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/directory">Manager Directory</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/lzp">LZP Archive +</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/events">Upcoming Events</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/board">Message Board</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/champions">Champions</Link>
                        </div>
                        <div className={navStyles.item}>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
