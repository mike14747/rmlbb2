import Link from 'next/link';

import styles from '../styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navdropdownContent}>
                <div className={styles.item}>
                    <Link href="/current"><a>Current Season +</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/downloads"><a>Downloads +</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/constitution"><a>Constitution</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/directory"><a>Manager Directory</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/lzp"><a>LZP Archive +</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/events"><a>Upcoming Events</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/board"><a>Message Board</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/champions"><a>Champions</a></Link>
                </div>
                <div className={styles.item}>
                    <Link href="/contact"><a>Contact</a></Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
