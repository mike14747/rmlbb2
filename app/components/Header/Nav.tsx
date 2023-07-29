'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLinks from '@/lib/navLinks';
import Button from '../Button';

import styles from '@/styles/Nav.module.css';

const Nav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const hide = () => setIsOpen(false);
    const show = () => setIsOpen(true);

    return (
        <nav className={styles.nav}>
            <Button
                size='small'
                variant='text'
                onClick={toggle}
            >
                <span className={`${styles.menuButton} ${isOpen ? styles.cross : styles.burger}`}></span>
            </Button>
            <ul className={`${styles.navDropdownContent} ${isOpen ? styles.showMenu : ''}`}>
                {NavLinks?.length > 0 &&
                    NavLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className={pathname === item.href ? styles.disabled : ''} onClick={toggle} onBlur={hide} onFocus={show}>
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
