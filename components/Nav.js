import Link from 'next/link';

import styles from '../styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navdropdownContent}>

                <Link href="/current"><a>Current Season +</a></Link>

                <Link href="/downloads"><a>Downloads +</a></Link>

                <Link href="/constitution"><a>Constitution</a></Link>

                <Link href="/directory"><a>Manager Directory</a></Link>

                <Link href="/lzp"><a>LZP Archive +</a></Link>

                <Link href="/events"><a>Upcoming Events</a></Link >

                <Link href="/board"><a>Message Board</a></Link >

                <Link href="/champions"><a>Champions</a></Link >

                <Link href="/contact"><a>Contact</a></Link>

            </div >
        </nav >
    );
};

export default Nav;
