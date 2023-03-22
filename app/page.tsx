'use client';

import type { Metadata } from 'next';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from '../lib/serializers';

// import styles from '../styles/home.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

type HomepageProps = {
    params: {
        numInitialNewsItems: number;
        newsItemIncrement: number;
    }
}

export default function Home({ params }: HomepageProps) {
    console.log({ params });
    return (
        <main id="main">
            <article>
                <h2 className="page-heading">
                    Latest News
                </h2>

                <p>
                    Items passed from the RootLayout to children (the pages) via props: <strong>{params.numInitialNewsItems}</strong> and <strong>{params.newsItemIncrement}</strong>
                </p>
            </article>
        </main>
    );
}
