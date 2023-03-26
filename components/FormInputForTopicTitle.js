import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForTopicTitle({ title, setTitle }) {
    return (
        <FormInput
            id="title"
            label="Title"
            name="title"
            type="text"
            value={title}
            required={true}
            handleChange={(e) => setTitle(e.target.value)}
            maxLength="50"
        />
    );
}
FormInputForTopicTitle.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
};
