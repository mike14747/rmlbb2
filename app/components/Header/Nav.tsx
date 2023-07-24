'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLinks from '@/lib/navLinks';

import styles from '@/styles/Nav.module.css';

const Nav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const hide = () => setIsOpen(false);
    const show = () => setIsOpen(true);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navdropdownContent}>
                {NavLinks?.length > 0 &&
                    NavLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className={pathname === item.href ? styles.disabled : ''}>
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
