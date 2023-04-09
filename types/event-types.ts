export type EventItemQuery = {
    event: string;
    eventDate: string;
    details: string;
}

export type EventItemClient = {
    event: string;
    eventDateStr: string | undefined;
    daysUntil: number;
    details: string;
}
