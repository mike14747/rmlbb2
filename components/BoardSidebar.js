import PropTypes from 'prop-types';

import styles from '../styles/BoardSidebar.module.css';
import sidebarStyles from '../styles/Sidebar.module.css';

const BoardSidebar = ({ posts }) => {
    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.boardCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h4 className={sidebarStyles.heading}>Posts</h4>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h4 className={sidebarStyles.heading}>Recent Posts</h4>
                    </div>

                    <div className={sidebarStyles.body}>
                        {!posts && <p>An error occurred fetching data.</p>}

                        {posts?.length === 0 && <p>There are no recent posts to display. Check back again soon.</p>}
                    </div>
                </div>

            </section>
        </div>
    );
};

BoardSidebar.propTypes = {
    posts: PropTypes.array,
};

export default BoardSidebar;
