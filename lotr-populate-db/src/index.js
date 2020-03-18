const fs = require('fs');

const {saveInDatabase} = require('./saveInDatabase');

const raw = fs.readFileSync('data.json');
const {characters} = JSON.parse(raw);

characters.forEach(async (character) => {
  await saveInDatabase(character);
});
