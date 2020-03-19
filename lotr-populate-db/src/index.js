const fs = require('fs');

const {saveInDatabase} = require('./saveInDatabase');

const raw = fs.readFileSync('data.json');
const {characters} = JSON.parse(raw);

console.log('Waiting for 30 seconds for Postgresql to run');
setTimeout(async () => {
  await saveInDatabase(characters);
}, 30000);
