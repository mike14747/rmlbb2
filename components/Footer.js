import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer data-testid="footer" className={'container ' + styles.footer}>
            &copy; 2015 RML Baseball
        </footer>
    );
};

export default Footer;
