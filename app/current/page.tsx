import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RML Baseball - Current Season',
};

export default function CurrentSeason() {
    return (
        <main id="main">
            <article>
                <h1 className="page-heading">
                    Current Season
                </h1>
            </article>
        </main>
    );
}
