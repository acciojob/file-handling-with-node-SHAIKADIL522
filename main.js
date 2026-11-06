const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = process.argv[2];
const columnName = process.argv[3];

if (!csvFilePath || !columnName) {
  console.log('Usage: node main.js <csvFilePath> <columnName>');
  process.exit(1);
}

let sum = 0;
let columnKey = null; // real header name found in the file
const target = columnName.trim().toLowerCase();

const stream = fs.createReadStream(csvFilePath);

stream.on('error', (err) => {
  console.log(`Error: ${err.message}`);
});

stream
  .pipe(csv())
  .on('headers', (headers) => {
    const match = headers.find((h) => h.trim().toLowerCase() === target);
    if (match !== undefined) columnKey = match;
  })
  .on('data', (data) => {
    if (columnKey === null) return;
    const value = Number(data[columnKey]);
    if (!isNaN(value)) sum += value;
  })
  .on('end', () => {
    if (columnKey === null) {
      console.log('Invalid column name');
    } else {
      console.log(`The sum of ${target} is: ${sum}`);
    }
  });