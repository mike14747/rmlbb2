import { basePublicQueryUrl } from '../../lib/settings';

const today = new Date().toISOString().slice(0, 10);

export async function getNextUpcomingEvents() {

}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${today}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || null;
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || [];
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${today}"] | order(eventDate desc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || null;
}
