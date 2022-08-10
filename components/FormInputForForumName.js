import PropTypes from 'prop-types';
import FormInput from './FormInput';
import { forumNamePattern, forumNameErrorMsg } from '../lib/formInputPatterns';

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
            pattern={forumNamePattern}
            errorMsg={forumNameErrorMsg}
        />
    );
}
FormInputForForumName.propTypes = {
    id: PropTypes.number,
    forumName: PropTypes.string,
    setForumName: PropTypes.func,
};
