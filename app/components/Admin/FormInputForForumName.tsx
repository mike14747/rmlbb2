'use client';

import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import FormInput from '@/components/FormInput';
import { forumNamePattern, forumNameErrorMsg } from '@/lib/formInputPatterns';

export default function FormInputForForumName({ id = undefined, forumName, setForumName }: { id?: number; forumName: string; setForumName: Dispatch<SetStateAction<string>> }) {
    return (
        <FormInput
            id={id ? 'name' + id : 'forumName'}
            label="Forum Name"
            name="forumName"
            type="text"
            value={forumName}
            required={true}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setForumName(e.target.value)}
            pattern={forumNamePattern}
            errorMsg={forumNameErrorMsg}
            maxLength={30}
        />
    );
}
