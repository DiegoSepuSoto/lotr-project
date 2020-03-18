exports.getCharacterInfo = async (browser, characterURL) => {
  const characterPage = await browser.newPage();

  try {
    await characterPage.goto(characterURL);

    const characterLink = await characterPage.evaluate(() => {
      const images = document.querySelectorAll('img');
      const title = document.querySelector('#firstHeading');

      if (images.length > 1 && title) {
        const image = images[1];
        const link = image.src;
        return {name: title.innerHTML, image: link};
      }

      return null;
    });

    return characterLink;
  } catch (error) {
    console.error(error);
  }
};
