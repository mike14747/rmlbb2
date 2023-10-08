import Link from 'next/link';
import Authbar from './Authbar';
import Nav from './Nav';
import Image from 'next/image';

import styles from '@/styles/Header.module.css';

export default function Header() {
    return (
        <header className={'container'}>
            <Authbar />

            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logoContainer}>
                        <Link href="/" passHref>
                            <Image
                                src="/images/logo1.png"
                                alt={'RML Baseball'}
                                title={'RML Baseball'}
                                width={80}
                                height={80}
                                className={styles.logo}
                            />
                        </Link>
                    </div>
                    <div>
                        <div className={styles.heading}>
                            RML Baseball
                        </div>
                        <p className={styles.subHeading}>
                            Since 1978
                        </p>
                    </div>
                </div>

                <Nav />
            </div>
        </header >
    );
}
