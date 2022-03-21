import { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../lib/serializers';
import Sidebar from '../components/Sidebar';
import { getNewsItems } from '../lib/api/news';
import { getNextUpcomingEvents } from '../lib/api/events';
import { getMostRecentPostsForHomepage } from '../lib/api/forum';
import Loading from '../components/Loading';
import Button from '../components/Button';

import styles from '../styles/home.module.css';

const initial = parseInt(process.env.INITIAL_NEWS_ITEMS);

const Home = ({ total, initialNewsItems, events, posts }) => {
    const [newsItems, setNewsItems] = useState(initialNewsItems);
    const [totalNewsItems, setTotalNewsItems] = useState(total);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (totalNewsItems > newsItems.length) {
            setIsLoading(true);
            fetch('/api/news?start=' + newsItems?.length)
                .then(res => res.json())
                .then(newNews => {
                    // this method works, but I've commented it out in favor of just checking the _id field for uniqueness using reduce
                    // newsItems?.length > 0 && setNewsItems(Array.from(new Set([...newsItems, ...newNews].map(JSON.stringify))).map(JSON.parse));

                    // this method is working. but is it necessary to check for unique news items
                    const mergedNews = [...newsItems, ...newNews.newsItems];
                    const uniqueNewsItems = [];
                    mergedNews.reduce((acc, cur) => {
                        if (acc.indexOf(cur._id) === -1) {
                            acc.push(cur._id);
                            uniqueNewsItems.push(cur);
                        }
                        return acc;
                    }, []);

                    setTotalNewsItems(newNews.total);
                    setNewsItems(mergedNews);

                    // this method works, but doesn't do any testing for unique items
                    // setNewsItems([...newsItems, ...newNews]);
                })
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
                <article className={styles.newsContainer + ' mw-75'}>
                    <h2 className="page-heading">
                        Latest News
                    </h2>

                    {!newsItems && <p className="error">An error occurred fetching data.</p>}

                    {newsItems?.length > 0
                        ? newsItems.map((item, index) => (
                            <section key={index} className={styles.newsItem}>
                                <h3 className={styles.newsHeading}>{item.title}</h3>
                                <p className={styles.newsDate}><small>{item.date}</small></p>
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
                            <Button onClick={handleClick} size="medium" variant="contained">Load More News</Button>
                        </div>
                    }
                </article>

                <Sidebar events={events} posts={posts} />
            </div>
        </>
    );
};

Home.propTypes = {
    total: PropTypes.number,
    initialNewsItems: PropTypes.array,
    events: PropTypes.array,
    posts: PropTypes.array,
};

export async function getStaticProps() {
    const { total, newsItems: initialNewsItems } = await getNewsItems(0, initial).catch(error => console.log(error));
    const events = await getNextUpcomingEvents().catch(error => console.log(error)) || null;
    const posts = await getMostRecentPostsForHomepage().catch(error => console.log(error)) || null;

    return {
        props: { total, initialNewsItems, events, posts },
        revalidate: 1, // page regeneration can occur in 1 sec
    };
}

export default Home;
