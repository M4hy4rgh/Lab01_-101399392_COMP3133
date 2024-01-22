// Step 3: Download input_countries.csv file

const fs = require('fs');
const csv = require('csv-parser');

// Step 3a: Delete canada.txt and usa.txt if already exist
fs.unlinkSync('canada.txt', (err) => {
  if (err) console.error(err);
  console.log('canada.txt deleted');
});

fs.unlinkSync('usa.txt', (err) => {
  if (err) console.error(err);
  console.log('usa.txt deleted');
});

// Step 3b: Filter data of Canada and write data to canada.txt
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'canada') {
      fs.appendFileSync('canada.txt', `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log('Canada data filtered and written to canada.txt');
  });

// Step 3c: Filter data of United States and write data to usa.txt
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'united states') {
      fs.appendFileSync('usa.txt', `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log('United States data filtered and written to usa.txt');
  });
