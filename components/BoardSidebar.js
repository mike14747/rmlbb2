import styles from '../styles/BoardSidebar.module.css';

const BoardSidebar = () => {
    return (
        <aside aria-label="Recent Posts">
            <h4 className={styles.postsHeading}>Recent Posts</h4>
            <p>This will be the recent message board posts sidebar.</p>
        </aside>
    );
};

export default BoardSidebar;
