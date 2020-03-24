const getCharacterInfo = async (browser, characterURL) => {
  const characterPage = await browser.newPage();

  try {
    await characterPage.goto(characterURL);

    const characterLink = await characterPage.evaluate(() => {
      const images = document.querySelectorAll('img');
      const title = document.querySelector('#firstHeading');

      if (images.length > 1 && title) {
        const image = images[1];
        const link = image.src;
        return {name: title.innerText, image: link};
      }

      return null;
    });

    return characterLink;
  } catch (error) {
    console.error(error);
  }
};

exports.createCharactersArray = async (characters, browser, category) => {
  try {
    for (let i = 0; i < characters.length; i++) {
      const info = await getCharacterInfo(browser, characters[i]);
      if (info !== null && info !== undefined)
        characters[i] = {
          link: characters[i],
          image: info.image,
          title: info.name,
          category: category,
        };
      else characters[i] = null;
    }
    return characters;
  } catch (error) {
    console.error(error);
  }
};
