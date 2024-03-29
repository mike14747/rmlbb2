import { formatDateString } from '../helpers/formatDate';
import { EventItemQuery } from '@/types/event-types';

const offset = new Date().getTimezoneOffset();
const todayStr = new Date(new Date().getTime() - offset * 60000).toISOString().slice(0, 10);
const todayStrPlusDays = new Date(new Date().getTime() - (offset * 60000) + (60 * 86400000)).toISOString().slice(0, 10); // today plus 60 days
const todayObj = new Date(new Date().getTime() - offset * 60000);

function insertFormattedDate(eventsArr: EventItemQuery[], type = 'short') {
    if (!eventsArr) return null;
    return eventsArr.map(event => {
        return {
            eventDateStr: formatDateString(event.eventDate, type),
            daysUntil: Math.ceil((+new Date(event.eventDate) - +todayObj) / (1000 * 60 * 60 * 24)),
            event: event.event,
            details: event.details,
        };
    });
}

async function getEventsData(query: string, type: 'short' | 'long') {
    if (!query) return null;
    const url = `${process.env.SANITY_PUBLIC_QUERY_URL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return insertFormattedDate(resJSON?.result, type);
}

export async function getNextUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}" && eventDate <= "${todayStrPlusDays}"] | order(eventDate asc){eventDate, event, details}`);
    return await getEventsData(query, 'short');
}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}"] | order(eventDate asc){eventDate, event, details}`);
    return await getEventsData(query, 'long');
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    return await getEventsData(query, 'long');
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${todayStr}"] | order(eventDate desc){eventDate, event, details}`);
    return await getEventsData(query, 'short');
}
