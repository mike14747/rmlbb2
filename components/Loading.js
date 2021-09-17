import styles from '../styles/Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src="/images/loading.gif" alt="Loading" />
        </div>
    );
};

export default Loading;
