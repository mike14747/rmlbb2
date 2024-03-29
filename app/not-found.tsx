// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'RML Baseball - Not Found',
// };

export default function NotFound() {
    return (
        <>
            <title>RML Baseball - Page Not Found</title>

            <main id="main">
                <article className="mw-90ch error-container">
                    <h1 className="error-heading">
                        Error 404!
                    </h1>

                    <p className="error">An error has occurred.</p>
                    <p className="error">The page you are looking for does not exist!</p>
                </article>
            </main>
        </>
    );
}
