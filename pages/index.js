import { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../lib/serializers';
import Sidebar from '../components/Sidebar';
import { getInitialNewsItems } from '../lib/api/news';
import { getNextUpcomingEvents } from '../lib/api/events';
import Loading from '../components/Loading';

import styles from '../styles/home.module.css';

const Home = ({ total, initialNewsItems, events }) => {
    const [newsItems, setNewsItems] = useState(initialNewsItems);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (total > newsItems.length) {
            setIsLoading(true);
            fetch('/api/news?start=' + newsItems?.length)
                .then(res => res.json())
                .then(newNews => newsItems?.length > 0 && setNewsItems(Array.from(new Set([...initialNewsItems, ...newNews].map(JSON.stringify))).map(JSON.parse)))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
        }
    };

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

                    {!newsItems && <p className="error">An error occurred fetching data.</p>}

                    {newsItems?.length > 0
                        ? newsItems.map((item, index) => (
                            <section key={index} className={styles.newsItem}>
                                <h3 className={styles.newsHeading}>{item.title}</h3>
                                <p className={styles.newsDate}><small>Date: {item.date}</small></p>
                                <BlockContent
                                    blocks={item.content}
                                    serializers={serializers}
                                />
                            </section>
                        ))
                        : newsItems?.length === 0
                            ? <p>There are no news items to display. Check back again soon.</p>
                            : <p>An error occurred fetching data.</p>
                    }

                    {isLoading && <Loading />}

                    {total > newsItems.length &&
                        <div className={styles.showMore}>
                            <button className={styles.showMoreButton} onClick={handleClick}>More News</button>
                        </div>
                    }
                </article>

                <Sidebar events={events} posts={null} />
            </div>
        </>
    );
};

Home.propTypes = {
    total: PropTypes.number,
    initialNewsItems: PropTypes.array,
    events: PropTypes.array,
};

export async function getStaticProps() {
    const { total, newsItems: initialNewsItems } = await getInitialNewsItems().catch(error => console.log(error));
    const events = await getNextUpcomingEvents().catch(error => console.log(error)) || null;

    return {
        props: { total, initialNewsItems, events },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Home;
