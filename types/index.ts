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
