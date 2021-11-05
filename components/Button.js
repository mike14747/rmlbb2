import PropTypes from 'prop-types';

import styles from '../styles/Button.module.css';

export default function Button({ text }) {
    return (
        <button className={styles.default}>{text}</button>
    );
}

Button.propTypes = {
    text: PropTypes.string,
};
