// import Sidebar from './components/Sidebar/Sidebar';
import type { Metadata } from 'next';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from '../lib/serializers';
import { SettingDataType } from '../types';
import { getSettings } from '../lib/api/settings';
import NewsItems from './components/NewsItems';
import { Suspense } from 'react';
import Spinner from './components/Spinner';
import EventsSidebar from './components/Sidebar/EventsSidebar';
import EventsSidebarContent from './components/Sidebar/EventsSidebarContent';
import BoardSidebar from './components/Sidebar/BoardSidebar';

import styles from '../styles/home.module.css';
import sideBarStyles from '../styles/Sidebar.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

export default async function Home() {
    const settingsData: SettingDataType = await getSettings();
    const { numInitialNewsItems, newsItemsIncrementNumber } = settingsData;

    return (
        <div className={styles.homeContainer}>
            <main id="main" className={styles.newsContainer + ' mw-75'}>
                <NewsItems numInitial={numInitialNewsItems} increment={newsItemsIncrementNumber} />
            </main>

            <aside className={sideBarStyles.sidebar}>
                <div className={sideBarStyles.eventsSidebarContainer}>
                    {/* @ts-expect-error Server Component */}
                    <EventsSidebar>
                        <Suspense fallback={<Spinner size="medium" />}>
                            {/* @ts-expect-error Server Component */}
                            <EventsSidebarContent />
                        </Suspense>
                    </EventsSidebar>

                </div>

                <div className={sideBarStyles.boardSidebarContainer}>
                    <Suspense fallback={<Spinner size="medium" />}>
                        <BoardSidebar />
                    </Suspense>
                </div>
            </aside>

        </div>
    );
}
