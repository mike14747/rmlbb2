import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className="container-fluid">
            <div className={'container ' + styles.header}>
                <h1>
                    RML Baseball
                </h1>
                Since 1978
            </div>
        </header>
    );
};

export default Header;
