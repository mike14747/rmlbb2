import { useRouter } from 'next/router';
import Head from 'next/head';
// import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';

export default function Forum() {
    const router = useRouter();

    const { data: session } = useSession();

    console.log('session', session);

    // if (typeof window === 'undefined') return null;



    // if (!session) return <p>Access Denied</p>;

    if (!session) return {
        redirect: {
            permanent: false,
            destination: '/forum',
        },
    };

    if (session) {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Forum
                    </title>
                </Head>

                <p>
                    You have selected a forum (id: {router.query.forumid}) and reached that forum&apos;s page.
                </p>
            </>
        );
    }
}

export async function getServerSideProps(context) {
    // return {
    //     props: {
    //         session: await getSession(context),
    //     },
    // };

    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/forum',
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
