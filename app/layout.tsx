// import { ReactNode } from 'react';
import type { Metadata } from 'next';
import ClientSessionProvider from './components/ClientSessionProvider';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import SkipToMain from './components/SkipToMain';
import TopInfo from './components/TopInfo';
// import { Session } from 'next-auth';
import { getSettings } from '../lib/api/settings';

import '../styles/mg_base.css';
import '../styles/globals.css';
import '../styles/my_tables.css';
import '../styles/rich-text.css';
import '../styles/tiptap.css';
import '../styles/suneditor.css';
import '../styles/suneditor-contents.css';

// type RootLayoutProps = {
//     children: ReactNode;
//     session: Session;
// };

type SettingDataType = {
    numInitialNewsItems: number;
    newsItemIncrement: number;
    topInfoText: string;
    topInfoActive: boolean;
    contactEmail: string;
    links: Array<{
        url: string;
        name: string;
    }>
}

async function getSettingsData() {
    return await getSettings().catch(error => console.log(error.message));
}

export const metadata: Metadata = {
    title: 'RML',
    description: 'Replay Money League, Strat-O-Matic Baseball',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    icons: {
        icon: [
            {
                url: '/images/rmlbb_favicon-16x16.png',
                sizes: '16x16',
            },
            {
                url: '/images/rmlbb_favicon-32x32.png',
                sizes: '32x32',
            },
        ],
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RootLayout({ children, session }: any) {
    const settingsData: SettingDataType = await getSettingsData().catch(error => console.log(error.message));

    return (
        <html lang="en">
            <body id="appWrapper">
                <ClientSessionProvider session={session}>
                    <SkipToMain />
                    <TopInfo topInfo={{ text: settingsData?.topInfoText, active: settingsData?.topInfoActive }} />
                    <Header />

                    <div className="page-container">
                        {children}
                        <ScrollTop />
                    </div>

                    <Footer contactEmail={settingsData?.contactEmail} links={settingsData?.links} />
                </ClientSessionProvider>
            </body>
        </html>
    );
}
