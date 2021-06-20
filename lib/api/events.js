const offset = new Date().getTimezoneOffset();
const todayStr = new Date(new Date().getTime() - offset * 60000).toISOString().slice(0, 10);
const todayStrPlusSixtyDays = new Date(new Date().getTime() - (offset * 60000) + (60 * 86400000)).toISOString().slice(0, 10);
const todayObj = new Date(new Date().getTime() - offset * 60000);
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];

function insertFormattedDate(eventsArr) {
    if (eventsArr === null) return null
    return eventsArr.map(event => {
        return {
            eventDate: `${months[parseInt(event.eventDate.slice(5, 7)) - 1]} ${event.eventDate.slice(8, 10)}, ${event.eventDate.slice(0, 4)}`,
            event: event.event,
            details: event.details,
        };
    });
}

export async function getNextUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}" && eventDate <= "${todayStrPlusSixtyDays}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));

    if (eventsJSON?.result.length === 0) return [];
    if (eventsJSON?.result.length > 0) return insertFormattedDate(eventsJSON.result);
    return null;
}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}"] | order(eventDate asc){eventDate, event, details}`);
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));

    let modifiedEvents = null;
    if (eventsJSON?.result.length === 0) modifiedEvents = [];
    if (eventsJSON?.result.length > 0) {
        modifiedEvents = eventsJSON.result.map(event => {
            return {
                eventDate: `${months[parseInt(event.eventDate.slice(5, 7)) - 1]} ${event.eventDate.slice(8, 10)}, ${event.eventDate.slice(0, 4)}`,
                daysUntil: Math.ceil((new Date(event.eventDate) - todayObj) / (1000 * 60 * 60 * 24)),
                event: event.event,
                details: event.details,
            };
        });
    }

    return modifiedEvents;
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    
    if (eventsJSON?.result.length === 0) return [];
    if (eventsJSON?.result.length > 0) return insertFormattedDate(eventsJSON.result);
    return null;
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${todayStr}"] | order(eventDate desc){eventDate, event, details}`);
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const eventsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));

    if (eventsJSON?.result.length === 0) return [];
    if (eventsJSON?.result.length > 0) return insertFormattedDate(eventsJSON.result);
    return null;
};
