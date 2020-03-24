const {Character} = require('./database/models/Character');

exports.saveInDatabase = async (characters) => {
  await Character.sync({force: true});
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] !== null) {
      const {title, link, image, category} = characters[i];
      try {
        await Character.create({title, link, image, category});
      } catch (error) {
        console.log(error);
      }
    }
  }
};
