import { EventItemClient } from './event-types';

export type SettingDataType = {
    numInitialNewsItems: number;
    newsItemsIncrementNumber: number;
    topInfoText: string;
    topInfoActive: boolean;
    contactEmail: string;
    links: Array<{
        url: string;
        name: string;
    }>
}

export type BoardSidebarData = {
    posts: Array<{
        date: string;
        forumName: string;
        username: string;
        title: string;
        content: string;
    }>
}

export type SidebarProps = EventItemClient & BoardSidebarData;

export type User = {
    id: string;
    name: string;
    role: 'user' | 'admin';
}

// I don't think this is used anyway... it might be here to document the token structure in next-auth
export type Token = {
    name: string;
    id: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
    jti: string;
}

export type ViewButtonState = {
    showChangeUsername: boolean;
    showChangePassword: boolean;
    showChangeEmail: boolean;
}

export type StatusCodeObj = {
    [key: number]: string;
}

export type IdParams = {
    params: {
        id: string;
    }
}
