import Link from 'next/link';
import Nav from './Nav';

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={'container ' + styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.heading}>
                    <Link href="/">
                        <a data-testid="logo-link" className={styles.logoText}>RML Baseball</a>
                    </Link>
                </h1>
                <p data-testid="sub-heading" className={'m-0 ' + styles.subHeading}>
                    <span aria-hidden="true" className={styles.subHeadingIcon}>Since 1978</span>
                </p>
            </div>

            <Nav />
        </header >
    );
};

export default Header;
