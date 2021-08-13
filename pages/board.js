import Head from 'next/head';
// import PropTypes from 'prop-types';

// import styles from '../styles/MessageBoard.module.css';

const MessageBoard = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Message Board
                </title>
            </Head>

            <main>
                <h2 className="pageHeading">
                    Message Board
                </h2>
            </main>
        </>
    );
};

MessageBoard.propTypes = {
};

export async function getServerSideProps() {
    return {
        props: {},
    };
};

export default MessageBoard;
