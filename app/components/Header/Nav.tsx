'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLinks from '@/lib/navLinks';
import { useState, useEffect, useRef } from 'react';
import Button from '../Button';

import styles from '@/styles/Nav.module.css';

export default function Nav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);

    const toggle = () => setIsOpen(!isOpen);
    const hide = () => setIsOpen(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (e: any) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return (() => {
            document.removeEventListener;
        });
    });

    return (
        <nav className={styles.nav} ref={navRef}>
            <div className={styles.buttonContainer}>
                <Button
                    size='small'
                    variant='text'
                    onClick={toggle}
                >
                    <span className={`${styles.menuButton} ${isOpen ? styles.cross : styles.burger}`}></span>
                </Button>
            </div>

            <ul className={`${styles.navDropdownContent} ${isOpen ? styles.showMenu : ''}`}>
                {NavLinks?.length > 0 &&
                    NavLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className={pathname === item.href ? styles.disabled : ''} onClick={hide}>
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
            </ul >
        </nav >
    );
}
