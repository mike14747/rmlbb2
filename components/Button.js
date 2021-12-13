import PropTypes from 'prop-types';

import styles from '../styles/Button.module.css';

const sizes = ['small', 'medium', 'large', 'specialSize'];
const variants = ['outlined', 'text', 'contained', 'special'];
const types = ['button', 'submit', 'reset'];

export default function Button({ children, size, variant, onClick, type }) {
    const btnSize = sizes.includes(size) ? size : 'medium';
    const btnVariant = variants.includes(variant) ? variant : 'contained';
    const btnType = types.includes(type) ? type : 'button';

    return (
        <button
            onClick={onClick}
            type={btnType}
            className={`${styles.btn} ${styles[`${btnSize}`]} ${styles[`${btnVariant}`]}`}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};
