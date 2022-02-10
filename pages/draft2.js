import Head from 'next/head';
import DraftEditor from '../components/DraftEditor';

export default function Draft2() {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Draft
                </title>
            </Head>

            <h2 className="page-heading">
                Draft Editor Testing
            </h2>

            <DraftEditor />
        </>
    );
}
