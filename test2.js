const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.setContent(`
    <html>
      <head>
        <script src="https://cdn.shopify.com/s/javascripts/web-components/v0.1.0/shopify-storefront-components.js"></script>
      </head>
      <body>
        <shopify-store domain="todaysfashionn.myshopify.com" storefront-access-token="a67bf416557b4fecb8de04ab240f90c8">
          <shopify-list-context type="product" query="products" first="10">
            <template>
                <div class="product-card">
                  <shopify-data query="product.title"></shopify-data>
                </div>
            </template>
            <div shopify-loading-placeholder>Loading...</div>
          </shopify-list-context>
        </shopify-store>
      </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 5000));
  
  const html = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  console.log("RENDERED HTML:", html);
  
  await browser.close();
})();
