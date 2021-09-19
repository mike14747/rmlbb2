### Navigation area

-   Current Season +
-   Downloads +
-   Constitution
-   Manager Directory
-   LZP Archive +
-   Upcoming Events
-   Message Board
-   Champions
-   Contact

Also needed in the header/nav area:

-   Logged in status
    -   Log In
    -   Logged in as: blaze | Logout

Burger Menu:

```css
#header #nav_trigger a::before {
    color: #cf2036;
    content: '\2630';
    font-weight: normal;
    font-size: 1.5rem;
}
```

Downward pointing arrow:

```css
.someClass::before {
    content: '\25BC';
}
```

275D - Open Quote
275E - Close Quote

---

Formatting / Grouping the manager list for the directory page.

```js
const managers = [
    {
        conference: ['National'],
        division: ['West'],
        team: 'Colt .45s',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Reds',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Captains',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Hollywood Stars',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Stogies',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Expos',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Twins',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Browns',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Blaze',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Kansas City Monarchs',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Quad City River Bandits',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Grand Rapids Gypsies',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Highlanders',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'Whales',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'River Dogs',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Grays',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Knights',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Yellow Jackets',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'TinCaps',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Dodgers',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'Pilgrims',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Mudhens',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Pelicans',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Pilots',
    },
];

const formatted = managers.reduce((acc, cur) => {
    let conf = cur.conference;
    let div = cur.division;
    if (!acc[conf]) {
        acc[conf] = [];
    }
    if (!acc[conf][div]) {
        acc[conf][div] = [];
    }
    acc[conf][div].push(cur);
    return acc;
}, []);

console.log(formatted);
```

```js
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
```

...or

```js
const managers = [
    {
        conference: ['National'],
        division: ['West'],
        team: 'Colt .45s',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Reds',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Captains',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Hollywood Stars',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Stogies',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Expos',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Twins',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Browns',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Blaze',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Kansas City Monarchs',
    },
    {
        conference: ['National'],
        division: ['East'],
        team: 'Quad City River Bandits',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Grand Rapids Gypsies',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Highlanders',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'Whales',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'River Dogs',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Grays',
    },
    {
        conference: ['American'],
        division: ['East'],
        team: 'Knights',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Yellow Jackets',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'TinCaps',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Dodgers',
    },
    {
        conference: ['National'],
        division: ['West'],
        team: 'Pilgrims',
    },
    {
        conference: ['American'],
        division: ['West'],
        team: 'Mudhens',
    },
    {
        conference: ['American'],
        division: ['Central'],
        team: 'Pelicans',
    },
    {
        conference: ['National'],
        division: ['Central'],
        team: 'Pilots',
    },
];

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

const formatted = managers.reduce((acc, cur) => {
    let confKey = acc.findIndex(element => element.conference === cur.conference[0]);
    let divKey = acc[confKey].divisions.findIndex(element => element.division === cur.division[0]);
    acc[confKey].divisions[divKey].teams.push(cur);
    return acc;
}, initial);

console.log(formatted);
```

---
