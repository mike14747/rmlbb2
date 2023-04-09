'use client';

import { MutableRefObject, ChangeEvent } from 'react';
import FormInput from '@/components/FormInput';

export default function FormInputForTopicTitle({ title }: { title: MutableRefObject<string> }) {
    return (
        <FormInput
            id="title"
            label="Title"
            name="title"
            type="text"
            required={true}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => title.current = e.target.value}
            maxLength={50}
        />
    );
}
