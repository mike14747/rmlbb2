import Head from 'next/head';

export default function Protected() {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Protected Page
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Protected Page
                </h2>

                <p>
                    This page is protected by middleware.
                </p>

                <p>
                    You should only be seeing this if you are signed in.
                </p>
            </article>
        </>
    );
}
