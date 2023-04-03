import { Dispatch, SetStateAction } from 'react';
import FormInput from '@/components/FormInput';

export default function FormInputForActive({ id = null, active, setActive }: { id: number | null; active: boolean; setActive: Dispatch<SetStateAction<boolean>> }) {
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
