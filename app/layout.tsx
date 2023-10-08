import { ReactNode } from 'react';
import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Inter } from 'next/font/google';
import ClientSessionProvider from '@/components/ClientSessionProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/ScrollTop';
import SkipToMain from '@/components/SkipToMain';
import TopInfo from '@/components/TopInfo';
import { Session } from 'next-auth';
import { getSettings } from '@/lib/api/settings';
import { SettingDataType } from '@/types/misc-types';

import '@/styles/mg_base.css';
import '@/styles/globals.css';
import '@/styles/my_tables.css';
import '@/styles/rich-text.css';
import '@/styles/tiptap.css';
import '@/styles/suneditor.css';
import '@/styles/suneditor-contents.css';

type RootLayoutProps = {
    children: ReactNode;
    session: Session;
};

// fonts I like:
// Open_Sans
// Libre_Franklin
// Source_Sans_3
// Manrope
// Inter

const defaultFont = Inter({
    variable: '--font-default',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'RML Baseball',
    description: 'Replay Money League, Strat-O-Matic Baseball',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 2,
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

export const revalidate = 60;

export default async function RootLayout({ children, session }: RootLayoutProps) {
    const settingsData: SettingDataType = await getSettings();

    return (
        <html lang="en">
            <body id="appWrapper" className={defaultFont.variable}>
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
