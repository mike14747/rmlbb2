import { isTSEnumMember } from '@babel/types';
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
                        router.pathname === item.href
                            ? <li key={index}><Link href={item.href}><a>{item.text}</a></Link></li>
                            : <li key={index}><Link href={item.href}><a>{item.text}</a></Link></li>
                    ))
                }

            </ul >
        </nav >
    );
};

export default Nav;
