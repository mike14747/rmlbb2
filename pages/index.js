import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
// import { basePublicQueryUrl } from '../lib/settings';
import { getAllNewsItems } from '../lib/api/news';

import styles from '../styles/Home.module.css';

const Home = ({ news }) => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Homepage
                </title>
            </Head>
            <h2 className="pageHeading">
                Latest News
            </h2>

            {news.length > 0
                ? news.map((item, index) => (
                    <article key={index} className={styles.newsItem}>
                        <h4 className={styles.newsHeading}>{item.title}</h4>
                        <div className={styles.newsDate}>{item.date}</div>
                        <BlockContent
                            blocks={item.content}
                            serializers={noContainer}
                        />
                    </article>
                ))
                : <div>An error occurred fetching the news.</div>
            }
        </>
    );
};

Home.propTypes = {
    news: PropTypes.array,
};

export async function getStaticProps() {
    const news = await getAllNewsItems();

    return {
        props: { news },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Home;
