const monthsShort = [
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

const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const isValidDate = (value: Date) => value instanceof Date && !isNaN(+value);

export function formatDateObject(dateObj: Date, type = 'short') {
    if (!isValidDate(dateObj)) return undefined;

    const date = (type === 'short' ? monthsShort[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear() : monthsLong[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear());
    return date;
}

export function formatDateObjectWithTime(dateTimeObj: Date, type = 'short') {
    if (!isValidDate(dateTimeObj)) return undefined;

    const date = (type === 'short' ? monthsShort[dateTimeObj.getMonth()] + ' ' + dateTimeObj.getDate() + ', ' + dateTimeObj.getFullYear() : monthsLong[dateTimeObj.getMonth()] + ' ' + dateTimeObj.getDate() + ', ' + dateTimeObj.getFullYear());

    const time = dateTimeObj
        .toLocaleTimeString([], {
            // timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        .toLowerCase().replace(/^0+/, '');

    return date + ' ' + time;
}

export function formatDateString(dateStr: string, type = 'short') {
    if (!dateStr || typeof dateStr !== 'string') return undefined;
    if (!dateStr.match(/^[0-9]{4}-(([0]{1}[0-9]{1})|([1]{1}[0-2]{1}))-(([0-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$/)) return undefined;
    return ((type === 'short' ? monthsShort : monthsLong)[parseInt(dateStr.slice(5, 7)) - 1] + ' ' + dateStr.slice(8, 10) + ', ' + dateStr.slice(0, 4));
}
