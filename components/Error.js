const Error = () => {
    return (
        <div id="error">
            <h1 id="heading">A server error has occurred!</h1>
            <style jsx>{`
                #error {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: auto;
                    padding-bottom: 5rem;
                    width: 100vw;
                    height: 100vh;
                    background-color: #ffffff;
                }

                #heading {
                    text-align: center;
                    color: firebrick;
                }
            `}</style>
        </div>
    );
};

export default Error;
