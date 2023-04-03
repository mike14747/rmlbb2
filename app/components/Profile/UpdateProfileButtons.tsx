'use client';

import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Button';
import { ViewButtonState } from '@/types/index';

import styles from '@/styles/profile.module.css';

type UpdateProfileButtonsProps = {
    viewState: ViewButtonState
    setViewState: Dispatch<SetStateAction<ViewButtonState>>;
}

export default function UpdateProfileButtons({ viewState, setViewState }: UpdateProfileButtonsProps) {
    return (
        <nav aria-label="Update your account navigation" className={styles.showButtonNav}>
            <h3 className={styles.updateButtonsHeading}>Update your account</h3>

            {viewState.showChangeUsername
                ? <Button onClick={() => {
                    setViewState(prev => ({ ...prev, showChangeUsername: false }));
                }} type="button" size="small" variant="text" theme="primary">&#8594; Hide Update Username</Button>
                : <Button onClick={() => {
                    setViewState(() => ({
                        showChangeUsername: true,
                        showChangePassword: false,
                        showChangeEmail: false,
                    }));
                }} type="button" size="small" variant="text" theme="primary">Update Username</Button>
            }

            {viewState.showChangePassword
                ? <Button onClick={() => {
                    setViewState(prev => ({ ...prev, showChangePassword: false }));
                }} type="button" size="small" variant="text" theme="primary">&#8594; Hide Update Password</Button>
                : <Button onClick={() => {
                    setViewState(() => ({
                        showChangeUsername: false,
                        showChangePassword: true,
                        showChangeEmail: false,
                    }));
                }} type="button" size="small" variant="text" theme="primary">Update Password</Button>
            }

            {viewState.showChangeEmail
                ? <Button onClick={() => {
                    setViewState(prev => ({ ...prev, showChangeEmail: false }));
                }} type="button" size="small" variant="text" theme="primary">&#8594; Hide Update Email</Button>
                : <Button onClick={() => {
                    setViewState(() => ({
                        showChangeUsername: false,
                        showChangePassword: false,
                        showChangeEmail: true,
                    }));
                }} type="button" size="small" variant="text" theme="primary">Update Email</Button>
            }
        </nav>
    );
}
