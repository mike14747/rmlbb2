import { ManagerObj } from '../../types';

type InitialGroups = {
    conference: 'American' | 'National';
    divisions: Array<{
        division: 'East' | 'Central' | 'West',
        teams: ManagerObj[],
    }>
}

export function groupManagers(managers: ManagerObj[]) {
    if (!managers) return null;

    const initial: InitialGroups[] = [
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

    return managers.reduce((acc, cur) => {
        const confKey = acc.findIndex(element => element.conference === cur.conference[0]);
        const divKey = acc[confKey].divisions.findIndex(element => element.division === cur.division[0]);
        acc[confKey].divisions[divKey].teams.push(cur);
        return acc;
    }, initial);
}
