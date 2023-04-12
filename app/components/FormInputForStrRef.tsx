import { MutableRefObject, ChangeEvent } from 'react';
import FormInput from './FormInput';
// import { usernamePattern, usernameErrorMsg } from '@/lib/formInputPatterns';

export default function FormInputForStrRef({ str, pattern, errorMsg }: { str: MutableRefObject<string>; pattern: string; errorMsg: string }) {
    return (
        <FormInput
            id="username"
            label="Username"
            name="username"
            type="text"
            required={true}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => str.current = e.target.value}
            pattern={pattern}
            errorMsg={errorMsg}
        />
    );
}
