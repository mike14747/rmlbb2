import { MutableRefObject, ChangeEvent } from 'react';
import FormInput from '../FormInput';
import { forumNamePattern, forumNameErrorMsg } from '../../../lib/formInputPatterns';

export default function FormInputForForumName({ id = null, forumName }: { id?: number | null; forumName: MutableRefObject<string> }) {
    return (
        <FormInput
            id={id ? 'name' + id : 'forumName'}
            label="Forum Name"
            name="forumName"
            type="text"
            required={true}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => forumName.current = e.target.value}
            pattern={forumNamePattern}
            errorMsg={forumNameErrorMsg}
        />
    );
}
