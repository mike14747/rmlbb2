/* eslint-disable @typescript-eslint/no-require-imports */
const parse = require('csv-parse');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

function appendToFile(rowData) {
    const rowAsNdJson = `${JSON.stringify(rowData)}\n`;
    fs.appendFileSync(path.join(__dirname, '../../data/managers.ndjson'), rowAsNdJson);
}

function readCsvFile() {
    fs.createReadStream(path.join(__dirname, '../../data/managers.csv'))
        .pipe(
            parse({
                delimiter: ',',
                columns: true,
                trim: true,
                skip_empty_lines: true,
                cast: true,
            }),
        )
        .on('data', (row) => {
            const rowData = {
                _type: 'manager',
                teamId: row.team_id,
                team: row.teamname,
                conference: [row.conference],
                division: [row.division],
                description1: row.description1,
                manager1: row.manager1,
                address1a: row.address1a,
                address1b: row.address1b,
                city1: row.city1,
                state1: row.state1,
                country1: row.country1,
                zip1: row.zip1.toString(),
                phone1a: row.phone1a,
                phone1b: row.phone1b,
                email1a: row.email1a,
                email1b: row.email1b,
                description2: row.description2,
                manager2: row.manager2,
                address2a: row.address2a,
                address2b: row.address2b,
                city2: row.city2,
                state2: row.state2,
                country2: row.country2,
                zip2: row.zip2.toString(),
                phone2a: row.phone2a,
                phone2b: row.phone2b,
                email2a: row.email2a,
                email2b: row.email2b,
            };
            appendToFile(rowData);
        })
        .on('error', (error) => console.log('An error occured:', error));
}

async function openAndTruncateNdjsonFile() {
    try {
        await fsPromises.open(path.join(__dirname, '../../data/managers.ndjson'), 'w');
        await fsPromises.truncate(path.join(__dirname, '../../data/managers.ndjson'), 0);
        readCsvFile();
    } catch {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (error) => console.log(error);
    }
}

openAndTruncateNdjsonFile();

// team_id,conference,division_id,teamname,description1,manager1,address1a,address1b,city1,state1,country1,zip1,phone1a,phone1b,email1a,email1b,description2,manager2,address2a,address2b,city2,state2,country2,zip2,phone2a,phone2b,email2a,email2b
