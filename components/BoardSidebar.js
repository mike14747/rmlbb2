import styles from '../styles/BoardSidebar.module.css';

const BoardSidebar = () => {
    return (
        <>
            <section className={styles.card}>
                <div className={styles.head}>
                    <h4 className={styles.postsHeading}>Recent Posts</h4>
                    <p>This will be the recent message board posts sidebar.</p>
                </div>

                <div className={styles.smallScreenHead}>
                    <h4 className={styles.postsHeading}>Posts</h4>
                    <div className={styles.down}></div>
                </div>
            </section>
        </>
    );
};

export default BoardSidebar;
