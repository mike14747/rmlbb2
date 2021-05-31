import Link from 'next/link';
import Nav from './Nav';

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={'container ' + styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.heading}>
                    <Link href="/">
                        <a className={styles.logoText}>RML Baseball</a>
                    </Link>
                </h1>
                <p className={'m-0 ' + styles.subHeading}>
                    Since 1978
                </p>
            </div>

            <Nav />
        </header >
    );
};

export default Header;
