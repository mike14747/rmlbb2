import Head from 'next/head';

export default function Post() {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Message Forum
                </h2>

                <p>
                    Once you are logged in, this will show a list of the forum topics.
                </p>
            </article>
        </>
    );
}
