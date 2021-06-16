import { basePublicQueryUrl } from '../../lib/settings';

const today = new Date().toISOString().slice(0, 10);

export async function getNextUpcomingEvents() {

}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${today}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));

    const offset = new Date().getTimezoneOffset();
    let formattedEvents = null;
    if (eventsJSON?.result.length > 0) {
        formattedEvents = eventsJSON.result.map(event => {
            return {
                details: event.details,
                event: event.event,
                eventDate: JSON.stringify(new Date(new Date(event.eventDate).getTime() + offset * 60000)),
            };
        });
    } else if (eventsJSON?.result.length === 0) {
        formattedEvents = [];
    }

    console.log('eventsJSON.result:', eventsJSON.result);
    console.log('formattedEvents:', formattedEvents);

    // return eventsJSON?.result || null;
    return formattedEvents || null;
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || [];
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${today}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${basePublicQueryUrl}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return eventsJSON?.result || null;
}
