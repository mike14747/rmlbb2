import PropTypes from 'prop-types';
import FormInput from './FormInput';

export default function FormInputForActive({ id = null, active, setActive }) {
    return (
        <FormInput
            id={id ? 'active' + id : 'active'}
            label="Active"
            name="active"
            type="checkbox"
            checked={active}
            handleChange={() => id ? setActive(id, !active) : setActive(!active)}
        />
    );
}
FormInputForActive.propTypes = {
    id: PropTypes.number,
    active: PropTypes.bool,
    setActive: PropTypes.func,
};
