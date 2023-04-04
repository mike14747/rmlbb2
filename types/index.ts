import { AllUsersItemPost } from './serverlessFunctionTypes';

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

export type NewsItemsType = {
    newsItems: {
        id: string;
        title: string;
        date: string | null;
        content: PortableContentItem[];
    }[];
    total: number | null;
} | null

export type Event = {
    eventDateStr: string | null | undefined;
    event: string;
    details: string;
    daysUntil: number;
};

export type BoardSidebarData = {
    posts: Array<{
        date: string;
        forumName: string;
        username: string;
        title: string;
        content: string;
    }>
}

export type SidebarProps = Event & BoardSidebarData;

export interface User {
    id: string;
    name: string;
    role: 'user' | 'admin';
}

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
    registeredDateStr?: string;
}

export type AllUsersArray = AllUsersItemPost[] | null;

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

export type ManagerObj = {
    teamId: number;
    conference: string;
    division: string;
    team: string;
    abbreviation: string;
    description1: string;
    manager1: string;
    address1a: string;
    address1b: string;
    city1: string;
    state1: string;
    country1: string;
    zip1: string;
    phone1a: string;
    phone1b: string;
    email1a: string;
    email1b: string;
    description2: string;
    manager2: string;
    address2a: string;
    address2b: string;
    city2: string;
    state2: string;
    country2: string;
    zip2: string;
    phone2a: string;
    phone2b: string;
    email2a: string;
    email2b: string;
}

export type DownloadFile = {
    key: string;
    name: string;
    description: string | null;
    filename: string;
    ref: string;
}
