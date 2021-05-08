import Head from 'next/head';
import { connectToDatabase } from '../utils/mongodb';
import PropTypes from 'prop-types';

import styles from '../styles/MessageBoard.module.css';

const MessageBoard = ({ isConnected }) => {
    console.log('Is their a connection to mongodb?', isConnected);
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Message Board
                </title>
            </Head>
            <h2 className="pageHeading">
                Message Board
            </h2>
        </>
    );
};

MessageBoard.propTypes = {
    isConnected: PropTypes.bool,
};

export async function getServerSideProps(context) {
    const { client } = await connectToDatabase();

    const isConnected = await client.isConnected(); // Returns true or false

    return {
        props: { isConnected },
    };
};

export default MessageBoard;
