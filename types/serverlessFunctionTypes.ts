export type UserSignin = {
    id: number;
    username: string;
    password: string;
    salt: string;
    role: string;
}

export type TokenValid = {
    id: number;
    resetPasswordExpires: Date;
}

export type UserBasic = {
    id: number;
    username: string;
    email: string;
}
