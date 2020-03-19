const puppeteer = require('puppeteer');

const fs = require('fs');

const {getCharacterInfo} = require('./getCharacterInfo');

const URL = 'http://tolkiengateway.net/wiki/Category:Characters_in_The_Lord_of_the_Rings';

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const characters = await page.evaluate(async () => {
    const items = document.querySelectorAll('li');

    let elements = [];

    items.forEach((itemElement) => {
      if (itemElement.id === '') {
        const children = itemElement.firstChild;
        elements.push(children.href);
      }
    });

    return elements;
  });

  for (let i = 0; i < characters.length; i++) {
    const info = await getCharacterInfo(browser, characters[i]);
    if (info !== null)
      characters[i] = {
        link: characters[i],
        image: info.image,
        title: info.name,
      };
    else characters[i] = null;
  }

  fs.writeFileSync('data.json', JSON.stringify({characters}, null, 2));

  await browser.close();
};

main();
