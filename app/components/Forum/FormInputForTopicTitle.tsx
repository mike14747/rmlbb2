import { Dispatch, SetStateAction } from 'react';
import FormInput from '@/components/FormInput';

type TopicProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

export default function FormInputForTopicTitle({ title, setTitle }: TopicProps) {
    return (
        <FormInput
            id="title"
            label="Title"
            name="title"
            type="text"
            value={title}
            required={true}
            handleChange={(e) => setTitle(e.target.value)}
            maxLength={50}
        />
    );
}
