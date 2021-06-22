import Head from 'next/head';

import styles from '../styles/Contact.module.css';

const Contact = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Contact
                </title>
            </Head>

            <main>
                <h2 data-testid="pageHeading" className="pageHeading">
                    Contact
                </h2>
            </main>
        </>
    );
};

export default Contact;
