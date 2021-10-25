export default function formatDate(dateStr) {
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

    if (!dateStr || typeof dateStr !== 'string') return null;
    if (!dateStr.match(/^[0-9]{4}-(([0]{1}[0-9]{1})|([1]{1}[0-2]{1}))-(([0-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$/)) return null;
    return (months[parseInt(dateStr.slice(5, 7)) - 1] + ' ' + dateStr.slice(8, 10) + ', ' + dateStr.slice(0, 4));
}
