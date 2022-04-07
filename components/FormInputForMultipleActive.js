import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForMultipleActive({ id, active, setActive }) {
    return (
        <FormInput
            id={id}
            label="Active"
            name="active"
            type="checkbox"
            checked={active}
            handleChange={() => setActive(id, !active)}
        />
    );
}
FormInputForMultipleActive.propTypes = {
    id: PropTypes.number,
    active: PropTypes.bool,
    setActive: PropTypes.func,
};
