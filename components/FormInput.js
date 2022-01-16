import PropTypes from 'prop-types';

import styles from '../styles/FormInput.module.css';

const sizes = ['small', 'normal'];

export default function FormInput({ id, label, handleChange, errorMsg, required, size, ...rest }) {
    const inputSize = sizes.includes(size) ? size : 'normal';

    return (
        <div className={styles.inputWrapper}>
            {label &&
                <label htmlFor={id} className={`${styles.label} ${styles[`${inputSize}`]}`}>
                    {label}
                    {/* you can disable the following line if you don't want to notify the user of fields being required */}
                    {/* {required && <span className={styles.required}>*required field</span>} */}
                </label>
            }

            <input
                id={id}
                className={`${styles.input} ${styles[`${inputSize}`]}`}
                onChange={handleChange}
                required={required}
                {...rest}
            />

            {errorMsg &&
                <p className={styles.errorMessage}>{errorMsg}</p>
            }
        </div>
    );
}

FormInput.propTypes = {
    id: (props) => props?.label?.length > 0 && (!props.id || (typeof props.id !== 'string' && typeof props.id !== 'number')) && new Error('id is needed and must be in the proper format when a label is present'),
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
    required: PropTypes.bool,
    size: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'text',
        'number',
        'password',
        'date',
        'email',
        'tel',
        'url',
        'time',
    ]),
    placeholder: PropTypes.string,
    pattern: PropTypes.string,
    step: PropTypes.string,
};

FormInput.defaultProps = {
    id: null,
    label: null,
    required: null,
    type: 'text',
    placeholder: '',
    size: 'normal',
    errorMsg: '',
    pattern: null,
    step: null,
};