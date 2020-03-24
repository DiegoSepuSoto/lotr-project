const fs = require('fs');

const {saveInDatabase} = require('./saveInDatabase');

const raw = fs.readFileSync('data.json');
const {characters} = JSON.parse(raw);

console.log('Waiting 60 seconds for Postgresql to run');
setTimeout(async () => {
  try {
    await saveInDatabase(characters);
  } catch (error) {
    console.error(error);
  }
}, 60000);
