const domain = "todaysfashion-883.myshopify.com";
const token = "150aa004803dd6eb6e97b430f08ab1a8";

const query = `
{
  collections(first: 10) {
    edges {
      node {
        title
        handle
      }
    }
  }
  products(first: 20) {
    edges {
      node {
        title
        tags
        collections(first: 5) {
          edges {
            node {
              handle
            }
          }
        }
      }
    }
  }
}
`;

fetch(`https://${domain}/api/2024-04/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(json => {
  console.log(JSON.stringify(json, null, 2));
})
.catch(err => console.error(err));
