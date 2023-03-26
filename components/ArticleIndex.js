import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/ArticleIndex.module.css';
// import sidebarStyles from '../styles/Sidebar.module.css';

export default function ArticleIndex({ links }) {
    return (
        <div className={styles.articleIndexContainer}>
            <section className={styles.articleIndexCard}>
                <h4 className={styles.heading}>Article Index</h4>

                {links?.length > 0
                    ? <>
                        {links.map(article => (
                            <p key={article.slug}>
                                <Link href={'/articles/' + article.slug}>
                                    {article.title}
                                </Link>
                            </p>
                        ))}
                    </>
                    : <p className="error">There are no articles.Check back again soon.</p>
                }
            </section>
        </div>
    );
}

ArticleIndex.propTypes = {
    links: PropTypes.array,
};
