import Head from 'next/head';
// import PropTypes from 'prop-types';

// import styles from '../styles/board.module.css';

const MessageBoard = () => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Message Board
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Message Board
                </h2>
            </article>
        </>
    );
};

MessageBoard.propTypes = {
};

export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default MessageBoard;
