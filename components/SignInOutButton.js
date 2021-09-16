import PropTypes from 'prop-types';

import styles from '../styles/SignInOutButton.module.css';

const SignInOutButton = ({ func, text }) => {
    return (
        <>
            <span aria-hidden="true" className={styles.buttonsSpan}></span>
            <button onClick={func} className={styles.buttons}>
                {text}
            </button>
        </>
    );
};

SignInOutButton.propTypes = {
    func: PropTypes.func,
    text: PropTypes.string,
};

export default SignInOutButton;
