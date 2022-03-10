import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function NewPasswordFormInput({ password, setPassword, repeatPassword, setRepeatPassword }) {
    return (
        <>
            <FormInput
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                required={true}
                handleChange={(e) => setPassword(e.target.value)}
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$"
                errorMsg="Password must be from 8 to 20 characters in length."
            />

            <FormInput
                id="repeatPassword"
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                value={repeatPassword}
                required={true}
                handleChange={(e) => setRepeatPassword(e.target.value)}
                pattern={password}
                errorMsg="Passwords do not match."
            />
        </>
    );
}
NewPasswordFormInput.propTypes = {
    password: PropTypes.string,
    setPassword: PropTypes.func,
    repeatPassword: PropTypes.string,
    setRepeatPassword: PropTypes.func,
};
