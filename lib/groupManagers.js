const initial = [
    {
        conference: 'American',
        divisions: [
            {
                division: 'East',
                teams: [],
            },
            {
                division: 'Central',
                teams: [],
            },
            {
                division: 'West',
                teams: [],
            },
        ],
    },
    {
        conference: 'National',
        divisions: [
            {
                division: 'East',
                teams: [],
            },
            {
                division: 'Central',
                teams: [],
            },
            {
                division: 'West',
                teams: [],
            },
        ],
    },
];

export function groupManagers(managers) {
    if (!managers) return null;

    const formatted = managers.reduce((acc, cur) => {
        let confKey = acc.findIndex(element => element.conference === cur.conference[0]);
        let divKey = acc[confKey].divisions.findIndex(element => element.division === cur.division[0]);
        acc[confKey].divisions[divKey].teams.push(cur);
        return acc;
    }, initial);

    console.log('formatted in groupManagers:', formatted[0].divisions[0]);

    return formatted;
}
