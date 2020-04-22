import React, { useState, Fragment } from 'react';

function Home() {
    const [state, setState] = useState(19);
    return (
        <Fragment>
            Testing the Home page component. State = {state}
        </Fragment>
    );
}

export default Home;
