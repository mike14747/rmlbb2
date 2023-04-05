import { signOut } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { StatusCodeObj } from '../../types/misc-types';

export default function processStatusCodeWithSignout(res: void | Response, statusCodeErrorMessages: StatusCodeObj, setError: Dispatch<SetStateAction<string>>, setIsSubmitting: Dispatch<SetStateAction<boolean>>) {
    if (res?.status === 200) {
        setError('');
        signOut({ callbackUrl: '/' });
    } else {
        setIsSubmitting(false);
    }

    if (res && res.status !== 200) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');

    if (!res) setError(statusCodeErrorMessages[500]);

    return;
}
