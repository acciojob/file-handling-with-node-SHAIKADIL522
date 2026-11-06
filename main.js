const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = process.argv[2];
const columnName = process.argv[3];

let sum = 0;

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    // TODO: Add code to sum values in the specified column
  })
  .on('end', () => {
    console.log(`The sum of ${columnName} is: ${sum}`);
  });
