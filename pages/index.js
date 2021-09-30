// import { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
import Sidebar from '../components/Sidebar';
import { getSomeNewsItems, getAllNewsItems } from '../lib/api/news';
import { getNextUpcomingEvents } from '../lib/api/events';

import styles from '../styles/home.module.css';

const Home = ({ news, events }) => {
    // const [allNews, setAllNews] = useState(null);
    // const [showAllNews, setShowAllNews] = useState(false);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Homepage
                </title>
            </Head>

            <div className={styles.homeContainer}>
                <article className={styles.newsContainer}>
                    <h2 className="page-heading">
                        Latest News
                    </h2>

                    {news?.length > 0
                        ? news.map((item, index) => (
                            <section key={index} className={styles.newsItem}>
                                <h3 className={styles.newsHeading}>{item.title}</h3>
                                <p className={styles.newsDate}><small>Date: {item.date}</small></p>
                                <BlockContent
                                    blocks={item.content}
                                    serializers={noContainer}
                                />
                            </section>
                        ))
                        : news?.length === 0
                            ? <p>There are no news items to display. Check back again soon.</p>
                            : <p>An error occurred fetching data.</p>
                    }
                </article>

                <Sidebar events={events} posts={null} />
            </div>
        </>
    );
};

Home.propTypes = {
    news: PropTypes.array,
    events: PropTypes.array,
};

export async function getStaticProps() {
    const news = await getSomeNewsItems().catch(error => console.log(error)) || null;
    const events = await getNextUpcomingEvents().catch(error => console.log(error)) || null;

    return {
        props: { news, events },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Home;
