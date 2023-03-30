// import Sidebar from './components/Sidebar/Sidebar';
import type { Metadata } from 'next';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from '../lib/serializers';
import { SettingDataType } from '../types';
import { getSettings } from '../lib/api/settings';
import NewsItems from './components/NewsItems';
import { Suspense } from 'react';
import Loading from './components/Loading';
import EventsSidebar from './components/Sidebar/EventsSidebar';
import BoardSidebar from './components/Sidebar/BoardSidebar';

import styles from '../styles/home.module.css';
import sideBartyles from '../styles/Sidebar.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

async function getSettingsData() {
    return await getSettings().catch(error => console.log(error.message));
}

export default async function Home() {
    const settingsData: SettingDataType = await getSettingsData().catch(error => console.log(error.message));
    const { numInitialNewsItems, newsItemsIncrementNumber } = settingsData;

    return (
        <div className={styles.homeContainer}>
            <main id="main" className={styles.newsContainer + ' mw-75'}>
                <NewsItems numInitial={numInitialNewsItems} increment={newsItemsIncrementNumber} />
            </main>

            <aside className={sideBartyles.sidebar}>
                <div className={sideBartyles.eventsSidebarContainer}>

                    <Suspense fallback={<Loading />}>
                        {/* @ts-expect-error Server Component */}
                        <EventsSidebar />
                    </Suspense>
                </div>

                <div className={sideBartyles.boardSidebarContainer}>
                    <Suspense fallback={<Loading />}>
                        <BoardSidebar />
                    </Suspense>
                </div>
            </aside>

        </div>

    );
}
