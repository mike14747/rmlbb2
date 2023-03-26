import Link from 'next/link';
import { useRouter } from 'next/router';
import NavLinks from '../lib/navLinks';

import styles from '../styles/Nav.module.css';

const Nav = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <ul className={styles.navdropdownContent}>
                {NavLinks?.length > 0 &&
                    NavLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className={router?.pathname === item.href ? styles.disabled : ''}>
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
            </ul >
        </nav >
    );
};

export default Nav;
