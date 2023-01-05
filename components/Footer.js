import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/Footer.module.css';

const Footer = ({ contactEmail, links }) => {
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
                        <p className={styles.contact}>
                            <a href={contactEmail} className={styles.link}>
                                Contact Us
                            </a>
                        </p>
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
};

Footer.propTypes = {
    contactEmail: PropTypes.string,
    links: PropTypes.array,
};

export default Footer;
