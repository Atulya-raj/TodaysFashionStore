const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:3000/product.html?handle=short-sleeve-t-shirt', {waitUntil: 'networkidle0'});
  
  await new Promise(r => setTimeout(r, 5000));
  
  const pdpContextHtml = await page.evaluate(() => {
    const el = document.getElementById('pdp-context');
    return el ? el.innerHTML : 'NOT FOUND';
  });
  console.log("PDP CONTEXT:", pdpContextHtml);
  
  const collectionContextHtml = await page.evaluate(() => {
    const el = document.querySelector('shopify-context[type="collection"]');
    return el ? el.innerHTML : 'NOT FOUND';
  });
  console.log("COLLECTION CONTEXT:", collectionContextHtml);

  await browser.close();
})();
