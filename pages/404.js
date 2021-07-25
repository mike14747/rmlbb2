import Head from 'next/head';

const NoMatch = () => {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>

            <main id="no-match">
                <h2 className="error">
                    Error 404!
                </h2>

                <p>An error has occurred.</p>
                <p>The page you are looking for does not exist!</p>
                <style jsx>{`
                    #no-match {
                        margin: 1.5rem;
                    }

                    p {
                        font-size: 120%;
                    }

                    .error {
                        color: #dc3545;
                        margin-bottom: 1rem;
                    }
                `}</style>
            </main>
        </>
    );
};

export default NoMatch;
