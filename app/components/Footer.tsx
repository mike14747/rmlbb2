import Link from 'next/link';

import styles from '@/styles/Footer.module.css';

type FooterProps = {
    contactEmail: string;
    links: Array<{
        url: string;
        name: string;
    }>;
}

export default function Footer({ contactEmail, links }: FooterProps) {
    return (
        <footer className={'container ' + styles.footer}>
            <div className={styles.upper}>
                <div className={styles.left}>
                    {links?.length > 0 &&
                        <>
                            <h3 className={styles.resourcesHeading}>
                                RML Resources:
                            </h3>
                            {links.map((link, index) => (
                                <p key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        {link.name}
                                    </a>
                                </p>
                            ))}
                        </>
                    }
                </div>

                <div className={styles.right}>
                    {contactEmail &&
                        <address className={styles.contact}>
                            <a href={contactEmail} className={styles.link}>
                                Contact Us
                            </a>
                        </address>
                    }

                    <p className={styles.privacy}>
                        <Link href="/privacy" className={styles.link}>
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>

            <p className={styles.copyright}>
                &copy; 2015 RML Baseball
            </p>
        </footer>
    );
}
