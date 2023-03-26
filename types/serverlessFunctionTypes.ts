export type UserSignin = {
    _id: number;
    username: string;
    password: string;
    salt: string;
    role: string;
}

export type UserProfile = {
    username: string;
    email: string;
    registeredDate: string | null;
}

export type TokenValid = {
    id: number;
    resetPasswordExpires: Date;
}
