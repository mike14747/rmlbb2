'use client';

import { use, cache } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import type { Metadata } from 'next';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from '../lib/serializers';

import styles from '../styles/home.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

type HomepageProps = {
    params: {
        numInitialNewsItems: number;
        newsItemIncrement: number;
    }
}

const getEventsData = cache(async () => fetch('/api/homepage/recent-events').then(res => res.json()));

const getPostsData = cache(async () => fetch('/api/homepage/recent-posts').then(res => res.json()));

export default function Home({ params }: HomepageProps) {
    const events = use(getEventsData());
    const posts = use(getPostsData());

    return (
        <div className={styles.homeContainer}>
            <main id="main" className={styles.newsContainer + ' mw-75'}>
                <article>
                    <h2 className="page-heading">
                        Latest News
                    </h2>

                    <p>
                        Items passed from the RootLayout to children (the pages) via props: <strong>{params.numInitialNewsItems}</strong> and <strong>{params.newsItemIncrement}</strong>
                    </p>
                </article>
            </main>

            <Sidebar events={events} posts={posts} />
        </div>

    );
}
