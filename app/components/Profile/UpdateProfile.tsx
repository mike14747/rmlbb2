'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import UpdateProfileButtons from './UpdateProfileButtons';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import { UserInfoModified, ViewButtonState } from '../../../types';

export default function UpdateProfile({ user, setUser }: { user: UserInfoModified, setUser: Dispatch<SetStateAction<UserInfoModified>> }) {
    const [viewState, setViewState] = useState<ViewButtonState>({
        showChangeUsername: false,
        showChangePassword: false,
        showChangeEmail: false,
        showDeleteAccount: false,
    });

    return (
        <section>
            <UpdateProfileButtons viewState={viewState} setViewState={setViewState} />

            {viewState.showChangeUsername &&
                <ChangeUsername
                    id={user.id}
                />
            }

            {viewState.showChangePassword &&
                <ChangePassword
                    id={user.id}
                />
            }

            {viewState.showChangeEmail &&
                <ChangeEmail
                    id={user.id}
                    setUser={setUser}
                />
            }
        </section>
    );
}
