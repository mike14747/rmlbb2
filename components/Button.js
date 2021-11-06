import PropTypes from 'prop-types';

import styles from '../styles/Button.module.css';

const sizes = ['btnSmall', 'btnMedium', 'btnLarge'];
const variants = ['btnOutlined', 'btnText', 'btnContained'];
const colors = [];

export default function Button({ children, size, variant, color }) {
    const btnSize = sizes.includes(size) ? size : 'btnMedium';
    const btnVariant = variants.includes(variant) ? variant : 'btnContained';
    const btnColor = colors.includes(color) ? color : '';

    return (
        <button className={`${styles.btn} ${styles[`${btnSize}`]} ${styles[`${btnVariant}`]} ${styles[`${btnColor}`]}`}>{children}</button>
    );
}

Button.propTypes = {
    children: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
};
