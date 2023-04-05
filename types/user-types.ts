export type UserSignin = {
    _id: number;
    username: string;
    password: string;
    salt: string;
    role: string;
}

export type UserProfile = {
    id?: string;
    username: string;
    email: string;
    registeredDate: Date;
    registeredDateStr?: string;
}

export type UserInfo = {
    id: string;
    username: string;
    email: string;
    registeredDateStr?: string;
}

// this type serves as the base AllUsers type that will have a properties added to it in 2 other types in this file... it is not used outside this file
type AllUsersBase = {
    _id: string;
    username: string;
    email: string;
    active: boolean;
}

// this is the type for the query that comes back from the database on the getAllUsers serverless function... before it gets modified
export type AllUsersDateObj = AllUsersBase & {
    registeredDate: Date;
}

// this is the type that gets output from the getAllUsers serverless function to the client... after it's been modified
export type AllUsersDateStr = AllUsersBase & {
    registeredDateStr: string | undefined;
}
