const puppeteer = require('puppeteer');

const fs = require('fs');

const {createCharactersArray} = require('./functions');

const getCharacters = async () => {
  const URL_lotr = 'http://tolkiengateway.net/wiki/Category:Characters_in_The_Lord_of_the_Rings';
  const URL_hobb = 'http://tolkiengateway.net/wiki/Category:Characters_in_The_Hobbit';
  const URL_silm = 'http://tolkiengateway.net/wiki/Category:Characters_in_The_Silmarillion';

  try {
    const browser = await puppeteer.launch();

    const page_lotr = await browser.newPage();
    const page_hobb = await browser.newPage();
    const page_sil = await browser.newPage();

    await page_lotr.goto(URL_lotr);
    await page_hobb.goto(URL_hobb);
    await page_sil.goto(URL_silm);

    let characters_lotr = await page_lotr.evaluate(() => {
      const items = document.querySelectorAll('li');

      let elements = [];

      items.forEach((itemElement) => {
        // I can't make external function for this operation
        if (itemElement.id === '') {
          const children = itemElement.firstChild;
          elements.push(children.href);
        }
      });

      return elements;
      // Can't call filterElements() function in this scope because is different from nodejs scope
    });

    let characters_hobb = await page_hobb.evaluate(() => {
      const items = document.querySelectorAll('li');

      let elements = [];

      items.forEach((itemElement) => {
        // I can't make external function for this operation
        if (itemElement.id === '') {
          const children = itemElement.firstChild;
          elements.push(children.href);
        }
      });

      return elements;
    });

    let characters_silm = await page_sil.evaluate(() => {
      const items = document.querySelectorAll('li');

      let elements = [];

      items.forEach((itemElement) => {
        // I can't make external function for this operation
        if (itemElement.id === '') {
          const children = itemElement.firstChild;
          elements.push(children.href);
        }
      });

      return elements;
    });

    characters_hobb = await createCharactersArray(characters_hobb, browser, 'hobb_char');
    characters_lotr = await createCharactersArray(characters_lotr, browser, 'lotr_char');
    characters_silm = await createCharactersArray(characters_silm, browser, 'silm_char');

    const characters = characters_lotr.concat(characters_hobb, characters_silm);

    fs.writeFileSync('data.json', JSON.stringify({characters}, null, 2));

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

getCharacters();
