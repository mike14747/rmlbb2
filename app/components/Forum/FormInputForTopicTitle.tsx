'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import FormInput from '@/components/FormInput';

export default function FormInputForTopicTitle({ title, setTitle }: { title: string; setTitle: Dispatch<SetStateAction<string>> }) {
    return (
        <FormInput
            id="title"
            label="Title"
            name="title"
            type="text"
            required={true}
            value={title}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            maxLength={50}
        />
    );
}
