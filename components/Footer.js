import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className={'container ' + styles.footer}>
                &copy; 2015 RML Baseball
            </div>
        </footer>
    );
};

export default Footer;
