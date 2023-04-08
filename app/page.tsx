import type { Metadata } from 'next';
import { SettingDataType } from '@/types/misc-types';
import { getSettings } from '@/lib/api/settings';
import { getNewsItems } from '@/lib/api/news';
import NewsItems from '@/components/NewsItems';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import EventsSidebar from '@/components/Sidebar/EventsSidebar';
import EventsSidebarContent from '@/components/Sidebar/EventsSidebarContent';
import BoardSidebar from '@/components/Sidebar/BoardSidebar';
import BoardSidebarContent from './components/Sidebar/BoardSidebarContent';

import styles from '@/styles/home.module.css';
import sideBarStyles from '@/styles/Sidebar.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Homepage',
};

async function getInitialNewsItems(num: number) {
    return await getNewsItems(0, num);
}

export default async function Home() {
    const settingsData: SettingDataType = await getSettings();
    const { numInitialNewsItems, newsItemsIncrementNumber } = settingsData;

    const initialNewsItems = await getInitialNewsItems(numInitialNewsItems);

    return (
        <div className={styles.homeContainer}>
            <main id="main" className={styles.newsContainer + ' mw-75'}>
                <Suspense fallback={<Spinner size="large" />}>
                    <NewsItems initialNewsItems={initialNewsItems} numInitial={numInitialNewsItems} increment={newsItemsIncrementNumber} />
                </Suspense>
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
                    <BoardSidebar>
                        <Suspense fallback={<Spinner size="medium" />}>
                            {/* @ts-expect-error Server Component */}
                            <BoardSidebarContent />
                        </Suspense>
                    </BoardSidebar>
                </div>
            </aside>

        </div>
    );
}
