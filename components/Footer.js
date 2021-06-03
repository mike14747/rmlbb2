import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={'container ' + styles.footer}>
            <p className="m-0">
                &copy; 2015 RML Baseball
            </p>
        </footer>
    );
};

export default Footer;
