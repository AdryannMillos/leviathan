const puppeteer = require("puppeteer");
const Models = require("./models/index");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/raports");

  let commanders = [];

  let urls = [];
  while (await page.$("a.XN7yC")) {
    const pageUrls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("._0Z7nH"),
        (element) => element.href
      )
    );
    pageUrls.forEach((url) => urls.push(url));
    await page.waitForTimeout(4000);
    await page.click("a.XN7yC");
  }
  await newFunction();
  console.log(commanders);
  async function newFunction() {
    for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
      await page.goto(urls[i]);

      await page.waitForSelector("p.mm8Nw");

      const podium = await page.$$eval("p.mm8Nw ", (elements) =>
        elements.map((item) => item.textContent)
      );

      let location = podium.find((item) => item.includes("City"));
      location = location.replace("Country/City: ", "");

      let date = podium.find((item) => item.includes("Data"));
      date = date.replace("Data:  ", "");

      let nbPlayers = podium.find((item) => item.includes("Nb"));
      nbPlayers = nbPlayers.replace("Nb of players: ", "");

      let champion = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          (item.includes("1.") ||
            item.includes("1)") ||
            item.includes("1-") ||
            item.includes("1"))
      );
      if (champion !== undefined) {
        remove_before = champion.includes("-")
          ? champion.indexOf("-")
          : champion.indexOf(")");
        champion = champion.substring(remove_before + 2, champion.length - 2);
      }

      let second = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          (item.includes("2.") ||
            item.includes("2)") ||
            item.includes("2-") ||
            item.includes("2"))
      );
      if (second !== undefined) {
        remove_before = second.includes("-")
          ? second.indexOf("-")
          : second.indexOf(")");
        second = second.substring(remove_before + 2, second.length - 2);
      }

      let third = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          (item.includes("3.") ||
            item.includes("3)") ||
            item.includes("3-") ||
            item.includes("3"))
      );
      if (third !== undefined) {
        remove_before = third.includes("-")
          ? third.indexOf("-")
          : third.indexOf(")");
        third = third.substring(remove_before + 2, third.length - 2);
      }

      let fourth = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          (item.includes("4.") ||
            item.includes("4)") ||
            item.includes("4-") ||
            item.includes("4"))
      );
      if (fourth !== undefined) {
        remove_before = fourth.includes("-")
          ? fourth.indexOf("-")
          : fourth.indexOf(")");
        fourth = fourth.substring(remove_before + 2, fourth.length - 2);
      }

      let championship = {
        location: location,
        date: date,
        players: nbPlayers,
        champion: champion,
        top4: champion + " -" + second + "- " + third + " -" + fourth,
      };

      console.log(championship);
      await Models.Championships.create(championship);
      await page.waitForTimeout(4000);
    }
  }
})();
