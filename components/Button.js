import PropTypes from 'prop-types';

import styles from '../styles/Button.module.css';

const sizes = ['btnSmall', 'btnMedium', 'btnLarge', 'btnSpecialSize'];
const variants = ['btnOutlined', 'btnText', 'btnContained', 'btnSpecial'];
const types = ['submit'];

export default function Button({ children, size, variant, onClick, type }) {
    const btnSize = sizes.includes(size) ? size : 'btnMedium';
    const btnVariant = variants.includes(variant) ? variant : 'btnContained';
    const btnType = types.includes(type) ? type : null;

    return (
        <button {...(onClick && { onClick })} {...(type && { type: btnType })} className={`${styles.btn} ${styles[`${btnSize}`]} ${styles[`${btnVariant}`]}`}>{children}</button>
    );
}

Button.propTypes = {
    children: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};
