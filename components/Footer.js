import PropTypes from 'prop-types';

import styles from '../styles/Footer.module.css';

const Footer = ({ contactEmail, links }) => {
    console.log(links);
    return (
        <footer className={'container ' + styles.footer}>
            {contactEmail &&
                <p>
                    <a href={'mailto:' + contactEmail}>
                        Contact Us
                    </a>
                </p>
            }

            {links?.length > 0 &&
                <>
                    <p>
                        RML Resources:
                    </p>
                    {links.map((link, index) => (
                        <p key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        </p>
                    ))}
                </>
            }

            <p className="m-0">
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
