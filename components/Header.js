import Link from 'next/link';
import Nav from './Nav';

import styles from '../styles/Header.module.css';

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

            <Nav />
        </header >
    );
};

export default Header;
