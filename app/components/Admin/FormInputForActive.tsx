import { Dispatch, SetStateAction } from 'react';
import FormInput from '@/components/FormInput';

export default function FormInputForActive({ id = undefined, active, setActive }: { id?: number; active: boolean; setActive: Dispatch<SetStateAction<boolean>> }) {
    return (
        <FormInput
            id={id ? 'active' + id : 'active'}
            label="Active"
            name="active"
            type="checkbox"
            checked={active}
            handleChange={() => setActive(!active)}
        />
    );
}
