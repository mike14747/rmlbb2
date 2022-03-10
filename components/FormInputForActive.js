import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForActive({ active, setActive }) {
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
FormInputForActive.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
};
