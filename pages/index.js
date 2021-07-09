import { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
import EventsSidebar from '../components/EventsSidebar';
import BoardSidebar from '../components/BoardSidebar';
// import { basePublicQueryUrl } from '../lib/settings';
import { getSomeNewsItems, getAllNewsItems } from '../lib/api/news';
import { getNextUpcomingEvents } from '../lib/api/events';

import styles from '../styles/Home.module.css';

const Home = ({ news, events }) => {
    const [allNews, setAllNews] = useState(null);
    const [showAllNews, setShowAllNews] = useState(false);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Homepage
                </title>
            </Head>

            <div className={styles.homeContainer}>
                <main className={styles.main}>
                    <h2 className={'pageHeading ' + styles.homepageHeading}>
                        Latest News
                    </h2>

                    {news?.length > 0
                        ? news.map((item, index) => (
                            <article key={index} className={styles.newsItem}>
                                <h4 className={styles.newsHeading}>{item.title}</h4>
                                <p data-testid="news-date" className={'m-0 ' + styles.newsDate}>{item.date}</p>
                                <BlockContent
                                    blocks={item.content}
                                    serializers={noContainer}
                                />
                            </article>
                        ))
                        : news?.length === 0
                            ? <article>
                                <p data-testid="empty">There are no news items to display. Check back again soon.</p>
                            </article>
                            : <p data-testid="error">An error occurred fetching data.</p>
                    }
                </main>

                <section className={styles.sidebar}>
                    <aside className={styles.eventsSidebarContainer}>
                        <EventsSidebar events={events} />
                    </aside>
                    <aside className={styles.boardSidebarContainer}>
                        <BoardSidebar />
                    </aside>
                </section>
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
