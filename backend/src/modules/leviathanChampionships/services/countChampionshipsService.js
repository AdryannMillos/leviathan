const puppeteer = require("puppeteer");
const Models = require("../../../models/index");

async function execute() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/reports");

  let urls = [];
  while (await page.$("a.gwgQCb.IEV8qS")) {
    const pageUrls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("a.has-custom-focus"),
        (element) => element.href
      )
    );
    pageUrls.forEach((url) => urls.push(url));
    await page.waitForTimeout(4000);
    await page.click("a.gwgQCb.IEV8qS");
  }
  const pageUrls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("a.has-custom-focus"),
      (element) => element.href
    )
  );
  pageUrls.forEach((url) => urls.push(url));
  const count = await Models.Championships.findAll();
  console.log(count.length);
  console.log(urls.length);
  await browser.close();

  return (urls.length > count.length);
};

module.exports = {
  execute,
}