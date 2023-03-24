// import Sidebar from './components/Sidebar/Sidebar';
import type { Metadata } from 'next';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from '../lib/serializers';

import styles from '../styles/home.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

export default async function Home() {
    return (
        <div className={styles.homeContainer}>
            <main id="main" className={styles.newsContainer + ' mw-75'}>
                <article>
                    <h2 className="page-heading">
                        Latest News
                    </h2>

                    <p>
                        This is the temporary server component homepage... not filled with any content just yet.
                    </p>
                </article>
            </main>

            {/* <Sidebar /> */}
        </div>

    );
}
