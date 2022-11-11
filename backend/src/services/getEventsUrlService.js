const puppeteer = require("puppeteer");

async function execute() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/reports");

  let urlsArray = [];
  await page.waitForTimeout(4000);
  await page.click("a.gwgQCb.IEV8qS");

  while (await page.$("a.gwgQCb.IEV8qS")) {
    const pageUrls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("a.has-custom-focus"),
        (element) => element.href
      )
    );
    pageUrls.forEach((url) => urlsArray.push(url));
    await page.waitForTimeout(4000);
    await page.click("a.gwgQCb.IEV8qS");
  }
  const pageUrls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("a.has-custom-focus"),
      (element) => element.href
    )
  );
  pageUrls.forEach((url) => urlsArray.push(url));

  await browser.close();
console.log(urlsArray.length)
  return urlsArray;
}

module.exports = {
  execute,
};
