export type EventsSidebarProps = {
    events: Array<{
        eventDate: string;
        event: string;
        details: string;
    }>
}

export type BoardSidebarProps = {
    posts: Array<{
        date: string;
    forumName: string;
    username: string;
    title: string;
    content: string;
    }>
}

export type SidebarProps = EventsSidebarProps & BoardSidebarProps;

export interface User {
    id: string;
    name: string;
    role: 'user' | 'admin';
}

// export interface Session {
//     user: User;
//     expires: Date;
// }

export interface Token {
    name: string;
    id: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
    jti: string;
}

export type UserInfo = {
    id: string;
    username: string;
    email: string;
}

export type UserObjProp = {
    userObj: UserInfo;
}

export type ViewButtonState = {
    showChangeUsername: boolean;
    showChangePassword: boolean;
    showChangeEmail: boolean;
    showDeleteAccount: boolean;
}

export type StatusCodeObj = {
    [key: number]: string;
}

export type IdParams = {
    params: {
        id: string;
    }
}
