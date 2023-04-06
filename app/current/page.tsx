import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RML Baseball - Current Season',
};

export default async function CurrentSeason() {
    return (
        <article>
            <h2 className="page-heading">
                Current Season
            </h2>
        </article>
    );
}
