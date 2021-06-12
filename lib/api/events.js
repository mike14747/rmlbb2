import { basePublicQueryUrl } from '../../lib/settings';

export async function getNextUpcomingEvents() {

}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true && eventDate >= "2021-06-10"] | order(eventDate desc){eventDate, event, details}');
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || [];
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || [];
}
