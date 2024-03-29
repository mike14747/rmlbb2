# FormInput components

## Specialized versions

### FormInput for username

This component uses useRef instead of useState, as indicated by the handleChange function.

```tsx
'use client';

import { MutableRefObject, ChangeEvent } from 'react';
import FormInput from './FormInput';
import { usernamePattern, usernameErrorMsg } from '@/lib/formInputPatterns';

export default function FormInputForUsername({ username }: { username: MutableRefObject<string> }) {
    return (
        <FormInput
            id="username"
            label="Username"
            name="username"
            type="text"
            required={true}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => (username.current = e.target.value)}
            pattern={usernamePattern}
            errorMsg={usernameErrorMsg}
        />
    );
}
```

### FormInput for active boolean checkbox

This component uses state (active) and setState (setActive).

If there is an id passed to the component, that will be the id of the input field... if not, the id of the input field will be the string "active".

Changing the "active" state is done by setting changing it to the negation of what it currently is whenever the checkbox is clicked.

```tsx
'use client';

import { Dispatch, SetStateAction } from 'react';
import FormInput from '@/components/FormInput';

export default function FormInputForActive({
    id = undefined,
    active,
    setActive,
}: {
    id?: number;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}) {
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
```

### FormInput for new password

This FormInput component is 2 input fields in one.

```tsx
'use client';

import { MutableRefObject, ChangeEvent } from 'react';
import FormInput from './FormInput';
import { passwordPattern, passwordErrorMsg } from '@/lib/formInputPatterns';

export default function FormInputForNewPassword({
    password,
    repeatPassword,
}: {
    password: MutableRefObject<string>;
    repeatPassword: MutableRefObject<string>;
}) {
    return (
        <>
            <FormInput
                id="password"
                label="Password"
                name="password"
                type="password"
                required={true}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => (password.current = e.target.value)}
                pattern={passwordPattern}
                errorMsg={passwordErrorMsg}
            />

            <FormInput
                id="repeatPassword"
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                required={true}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => (repeatPassword.current = e.target.value)}
                pattern={passwordPattern}
                errorMsg={passwordErrorMsg}
            />
        </>
    );
}
```

Checking that the passwords match before submitting the form is handled by the parent component inside the "handleChangePasswordSubmit" function.

```tsx
if (password.current !== repeatPassword.current) {
    setError('Passwords do not match.');
    return;
}
```

I had to do it this way because I'm using useRef() instead of useState(). If I was using useState(), I could have set the pattern value for the repeatPassword ForumInput as "password" instead of "passwordPattern". But, I would have also needed to include "value" properties to each.

### ForumInput with useState

In this FormInput component, change is being handled by setting state (specifically setTitle() in this case).

This FormInput component uses useState() instead of useRef() because it needs to handle either adding a new topic title and also editing an already existing one.

If there is an id passed to the component, that will be the id of the input field... if not, the id of the input field will be the string "title".

```tsx
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
```

---
