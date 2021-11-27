import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/ArticleIndex.module.css';
import sidebarStyles from '../styles/Sidebar.module.css';

export default function ArticleIndex({ links }) {
    console.log('links:', links);
    return (
        <div className={sidebarStyles.cardContainer}>
            <section className={sidebarStyles.card + ' ' + styles.articleIndexCard}>
                <div className={sidebarStyles.smallScreen}>
                    <h4 className={sidebarStyles.heading}>Article Index</h4>
                    <div className={styles.down}></div>
                </div>

                <div className={sidebarStyles.normalScreen}>
                    <div className={sidebarStyles.head}>
                        <h4 className={sidebarStyles.heading}>Article Index</h4>
                    </div>
                    <div className={sidebarStyles.body}>
                        {links?.length > 0
                            ? <>
                                {links.map(article => (
                                    <p key={article.slug}>
                                        <Link href={'/articles/' + article.slug}>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a>
                                                {article.title}
                                            </a>
                                        </Link>
                                    </p>
                                ))}
                            </>
                            : <p className="error">There are no articles.Check back again soon.</p>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

ArticleIndex.propTypes = {
    links: PropTypes.array,
};
