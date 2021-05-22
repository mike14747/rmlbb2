import Link from 'next/link';

import styles from '../styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navdropdownContent}>

                <li><Link href="/current"><a>Current Season +</a></Link></li>

                <li><Link href="/downloads"><a>Downloads +</a></Link></li>

                <li><Link href="/constitution"><a>Constitution</a></Link></li>

                <li><Link href="/directory"><a>Manager Directory</a></Link></li>

                <li><Link href="/lzp"><a>LZP Archive +</a></Link></li>

                <li><Link href="/events"><a>Upcoming Events</a></Link ></li>

                <li><Link href="/board"><a>Message Board</a></Link ></li>

                <li><Link href="/champions"><a>Champions</a></Link ></li>

                <li><Link href="/contact"><a>Contact</a></Link></li>

            </ul >
        </nav >
    );
};

export default Nav;
