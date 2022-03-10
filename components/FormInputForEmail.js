import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForEmail({ email, setEmail }) {
    return (
        <FormInput
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            required={true}
            handleChange={(e) => setEmail(e.target.value)}
            pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
            errorMsg="Please enter a valid email address."
        />
    );
}

FormInputForEmail.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
};
