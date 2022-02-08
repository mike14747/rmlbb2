import Head from 'next/head';
import RichTextEditor from '../components/RichTextEditor';

export default function Draft() {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Draft
                </title>
            </Head>

            <h2 className="page-heading">
                Text Editor Testing
            </h2>

            <RichTextEditor />
        </>
    );
}
