import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ArticleIndex({ links }) {
    console.log('links:', links);
    return (
        <section>
            <h5>Article Index</h5>

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
                : <p className="error">There are no articles. Check back again soon.</p>
            }
        </section>
    );
}

ArticleIndex.propTypes = {
    links: PropTypes.array,
};
