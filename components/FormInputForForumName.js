import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForForumName({ id = null, forumName, setForumName }) {
    return (
        <FormInput
            id={id ? 'name' + id : 'forumName'}
            label="Forum Name"
            name="forumName"
            type="text"
            value={forumName}
            required={true}
            handleChange={(e) => id ? setForumName(id, e.target.value) : setForumName(e.target.value)}
            pattern="^(?=.{1,25}$)[a-zA-Z0-9]+(?:[/' _-][a-zA-Z0-9]+)*$"
            errorMsg="Forum name must be from 1 to 25 characters in length and not include any special characters other than forward slashes, apostrophes, dashes, spaces and underscores (but only 1 can be used consecutively). Must start and end with a letter or number."
        />
    );
}
FormInputForForumName.propTypes = {
    id: PropTypes.number,
    forumName: PropTypes.string,
    setForumName: PropTypes.func,
};
