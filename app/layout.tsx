import { ReactNode } from 'react';
import type { Metadata } from 'next';
import ClientSessionProvider from './components/ClientSessionProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import SkipToMain from './components/SkipToMain';
import { Session } from 'next-auth';
import { getSettings } from '../lib/api/settings';

import '../styles/mg_base.css';
import '../styles/globals.css';
import '../styles/my_tables.css';
import '../styles/rich-text.css';
import '../styles/tiptap.css';
import '../styles/suneditor.css';
import '../styles/suneditor-contents.css';

type RootLayoutProps = {
    children: ReactNode;
    session: Session;
    params: {
        numInitialNewsItems: number;
        newsItemIncrement: number;
    },
};

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

export default async function RootLayout({ children, session, params }: RootLayoutProps) {
    const settingsData = await getSettingsData().catch(error => console.log(error.message));

    params.numInitialNewsItems = settingsData?.numInitialNewsItems || 20;
    params.newsItemIncrement = settingsData?.newsItemIncrement || 50;

    return (
        <html lang="en">
            <body id="appWrapper">
                <ClientSessionProvider session={session}>
                    <SkipToMain />
                    <Header topInfoText={settingsData?.topInfoText} topInfoActive={settingsData?.topInfoActive} />

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
