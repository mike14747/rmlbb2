import Link from 'next/link';
import Nav from './Nav';

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={'container ' + styles.header}>
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
        </header >
    );
};

export default Header;
