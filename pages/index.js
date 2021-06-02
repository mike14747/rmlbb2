import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
// import { basePublicQueryUrl } from '../lib/settings';
import { getSomeNewsItems, getAllNewsItems } from '../lib/api/news';

import styles from '../styles/Home.module.css';

const Home = ({ news }) => {
    console.log(news);
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Homepage
                </title>
            </Head>
            <h2 data-testid="pageHeading" className="pageHeading">
                Latest News
            </h2>

            {news?.length > 0
                ? news.map((item, index) => (
                    <article key={index} data-testid="newsArticle" className={styles.newsItem}>
                        <h4 data-testid="newsHeading" className={styles.newsHeading}>{item.title}</h4>
                        <p data-testid="newsDate" className={'m-0 ' + styles.newsDate}>{item.date}</p>
                        <BlockContent
                            blocks={item.content}
                            serializers={noContainer}
                        />
                    </article>
                ))
                : <p>An error occurred fetching the news.</p>
            }
        </>
    );
};

Home.propTypes = {
    news: PropTypes.array,
};

export async function getStaticProps() {
    const news = await getSomeNewsItems();

    return {
        props: { news },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Home;
