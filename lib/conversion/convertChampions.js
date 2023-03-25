const parse = require('csv-parse');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

function appendToFile(rowData) {
    const rowAsNdJson = `${JSON.stringify(rowData)}\n`;
    fs.appendFileSync(path.join(__dirname, '../../data/champions.ndjson'), rowAsNdJson);
}

function readCsvFile() {
    fs.createReadStream(path.join(__dirname, '../../data/champions.csv'))
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
                _type: 'champion',
                year: row.year,
                championTeam: row.winning_team,
                championManager: row.winning_manager,
                runnerUpTeam: row.runner_up_team,
                runnerUpManager: row.runner_up_manager,
            };
            appendToFile(rowData);
        })
        .on('error', (error) => console.log('An error occured:', error));
}

async function openAndTruncateNdjsonFile() {
    try {
        await fsPromises.open(path.join(__dirname, '../../data/champions.ndjson'), 'w');
        await fsPromises.truncate(path.join(__dirname, '../../data/champions.ndjson'), 0);
        readCsvFile();
    } catch {
        (error) => console.log(error);
    }
}

openAndTruncateNdjsonFile();
