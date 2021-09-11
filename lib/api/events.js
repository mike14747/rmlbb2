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
    if (!eventsArr) return null;
    return eventsArr.map(event => {
        return {
            eventDate: months[parseInt(event.eventDate.slice(5, 7)) - 1] + ' ' + event.eventDate.slice(8, 10) + ', ' + event.eventDate.slice(0, 4),
            daysUntil: Math.ceil((new Date(event.eventDate) - todayObj) / (1000 * 60 * 60 * 24)),
            event: event.event,
            details: event.details,
        };
    });
}

async function getEventsData(query) {
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return insertFormattedDate(resJSON?.result);
}

export async function getNextUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}" && eventDate <= "${todayStrPlusSixtyDays}"] | order(eventDate asc){eventDate, event, details}`);
    return getEventsData(query);
}

export async function getAllActiveUpcomingEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate >= "${todayStr}"] | order(eventDate asc){eventDate, event, details}`);

    return getEventsData(query);
}

export async function getAllActiveEvents() {
    const query = encodeURIComponent('*[_type == "event" && active == true] | order(eventDate desc){eventDate, event, details}');
    return getEventsData(query);
}

export async function getAllActivePastEvents() {
    const query = encodeURIComponent(`*[_type == "event" && active == true && eventDate < "${todayStr}"] | order(eventDate desc){eventDate, event, details}`);
    return getEventsData(query);
}
