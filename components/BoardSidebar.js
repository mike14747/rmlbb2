import PropTypes from 'prop-types';
import Link from 'next/link';
import ParagraphRound from '../assets/paragraphRound.svg';

import styles from '../styles/BoardSidebar.module.css';
import sidebarStyles from '../styles/Sidebar.module.css';

const BoardSidebar = ({ posts }) => {
    // console.table(posts);
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
                        <p className={sidebarStyles.subHeading}>
                            Most recent 5
                        </p>
                    </div>

                    <div className={sidebarStyles.body}>
                        {!posts && <p>An error occurred fetching data.</p>}

                        {posts?.length === 0 && <p>There are no recent posts to display. Check back again soon.</p>}

                        {posts?.length > 0 &&
                            posts.map((post, index) => (
                                <div className={sidebarStyles.recentPost} key={index}>
                                    <p className={sidebarStyles.recentDate}><small>Date: </small>{post.date}</p>
                                    <p><small>Forum: </small>{post.forumName}</p>
                                    <p><small>Author: </small>{post.username}</p>
                                    <p><small>Topic: </small>{post.title}</p>
                                    <p><small>Content: </small>{post.content}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className={sidebarStyles.viewAll}>
                        <Link href="/forum">
                            Go to the Forum
                        </Link>

                        <ParagraphRound aria-hidden="true" className={sidebarStyles.icon2} />
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
