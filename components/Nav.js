import Link from 'next/link';

import styles from '../styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navdropdownContent}>
                <div className={styles.item}>
                    <Link href="/">Home</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/current">Current Season +</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/downloads">Downloads +</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/constitution">Constitution</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/directory">Manager Directory</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/lzp">LZP Archive +</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/events">Upcoming Events</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/board">Message Board</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/champions">Champions</Link>
                </div>
                <div className={styles.item}>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
