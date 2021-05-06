const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// Get product at date param
// @param date - selected date in front page
async function getProducts(req, res) {
  const { cookies } = req;

  let tempDate;
  let apiAccessToken;
  let paramDateAfter = new Date();
  let paramDateBefore = new Date();

  try {
    apiAccessToken = jwt.verify(cookies["product_hunt_token"], process.env.SECRET);
  } catch (err) {
    apiAccessToken = process.env.PH_APP_CLIENT_CREDENTIALS_TOKEN;
  }

  tempDate = new Date(req.query.date);
  let postedAfter = paramDateAfter.setDate(tempDate.getDate() - 1);
  let postedBefore = paramDateBefore.setDate(tempDate.getDate() + 1);
  postedAfter = new Date(postedAfter).toISOString();
  postedBefore = new Date(postedBefore).toISOString();

  const response = await fetch(`https://api.producthunt.com/v2/api/graphql`, {
    method: "post",
    body: JSON.stringify({ query: `query { posts(postedBefore:"${postedBefore}", postedAfter:"${postedAfter}", order: NEWEST) {
        edges{
          cursor
          node{
            id
            name
            tagline
            description
            url
            votesCount
            createdAt  
            thumbnail{
              type
              url
            }
            website
            reviewsRating
        }}
        pageInfo {
          endCursor
          hasNextPage
        }
      }}`}),
    headers: {
      "Content-Type": "application/json",
      ...(apiAccessToken ? { Authorization: `Bearer ${apiAccessToken}` } : {})
    }
  });
  res.json(await response.json());
}

module.exports = getProducts;
