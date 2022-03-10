import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForUsername({ username, setUsername }) {
    return (
        <FormInput
            id="username"
            label="Username"
            name="username"
            type="text"
            value={username}
            required={true}
            handleChange={(e) => setUsername(e.target.value)}
            pattern="^(?=.{4,15}$)[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$"
            errorMsg="Username must be from 4 to 15 characters in length and not include any special characters other than dashes, spaces and underscores (but only 1 can be used consecutively). Must start and end with a letter or number."
        />
    );
}
FormInputForUsername.propTypes = {
    username: PropTypes.string,
    setUsername: PropTypes.func,
};
