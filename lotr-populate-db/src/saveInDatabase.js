const {Character} = require('./database/models/Character');

exports.saveInDatabase = async (characters) => {
  await Character.sync({force: true});
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] !== null) {
      const {title, link, image, category} = characters[i];
      const now = Date.now();
      try {
        await Character.create({title, link, image, category, created_at: now, updated_at: now});
      } catch (error) {
        console.log(error);
      }
    }
  }
};
