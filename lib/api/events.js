import { basePublicQueryUrl } from '../../lib/settings';

const offset = new Date().getTimezoneOffset();
const todayStr = new Date(new Date().getTime() - offset * 60000).toISOString().slice(0, 10);
const todayObj = new Date(new Date().getTime() - offset * 60000);

export async function getNextUpcomingEvents() {

}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));

    let modifiedEvents = null;
    if (eventsJSON?.result.length === 0) modifiedEvents = [];
    if (eventsJSON?.result.length > 0) {
        modifiedEvents = eventsJSON.result.map(event => {
            return {
                eventDate: event.eventDate,
                daysUntil: Math.ceil((new Date(event.eventDate) - todayObj) / (1000 * 60 * 60 * 24)),
                event: event.event,
                details: event.details,
            };
        });
    }

    return modifiedEvents;
    // return eventsJSON?.result || null;
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || [];
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${todayStr}"] | order(eventDate desc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || null;
}
