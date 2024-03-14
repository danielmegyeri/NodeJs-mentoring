const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './csv/example.csv';
const outputFile = 'csvresult.txt';

const writerStream = fs.createWriteStream(outputFile, {
    flags: 'w'
});

const readerStream = fs.createReadStream(csvFilePath);

readerStream.on('line', (line) => {
    csv()
        .fromString(line)
        .then((jsonObj) => writerStream.write(JSON.parse(jsonObj) + '\n'))
        .catch(err => console.error(err));
});

readerStream.on('close', () => writerStream.end());

readerStream.on('error', (err) => console.error(err));

writerStream.on('error', (err) => console.error(err));
writerStream.on('finish', () => console.log(`Finished writing to ${outputFile}`));