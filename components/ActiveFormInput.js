import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function ActiveFormInput({ active, setActive }) {
    return (
        <FormInput
            id="active"
            label="Active"
            name="active"
            type="checkbox"
            checked={active}
            handleChange={() => setActive(!active)}
        />
    );
}
ActiveFormInput.propTypes = {
    active: PropTypes.string,
    setActive: PropTypes.func,
};
