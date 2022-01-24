import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';

export default function Topic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    if (!session) {
        router.push('/forum');
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <article>
                {loading && <Loading />}

                <p>You have selected a topic and reached that topic&apos;s page.</p>
            </article>
        </>
    );
}
