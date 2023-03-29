'use client';

type NewsItemProps = {
    numInitial: number;
    increment: number;
}

export default function NewsItems({ numInitial, increment }: NewsItemProps) {
    console.log({ numInitial, increment });
    return (
        <article>
            <h2>
                Latest News
            </h2>
        </article>
    );
}
