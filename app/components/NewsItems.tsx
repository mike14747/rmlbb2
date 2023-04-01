'use client';

import { PortableText } from '@portabletext/react';
import components from '../../lib/helpers/portalTextComponents';
import { NewsItemsType } from '../../types';

import styles from '../../styles/home.module.css';

type NewsItemProps = {
    initialNewsItems: NewsItemsType;
    numInitial: number;
    increment: number;
}

export default function NewsItems({ initialNewsItems, numInitial, increment }: NewsItemProps) {
    console.log({ numInitial, increment });
    const newsItems =  initialNewsItems?.newsItems || [];

    return (
        <article>
            <h2 className="page-heading">
                Latest News
            </h2>

            {newsItems.length === 0 && <p>No content was found. Please try again later.</p>}

            {newsItems.length > 0 &&
                newsItems.map((item) => (
                    <section key={item.id} className={styles.newsItem}>
                        <h3 className={styles.newsHeading}>{item.title}</h3>
                        <p className={styles.newsDate}><small>{item.date}</small></p>
                        <PortableText
                            value={item.content}
                            components={components}
                        />
                    </section>
                ))
            }

        </article>
    );
}
