const jwt = require("jsonwebtoken");

// Check if a token is present
function checkConnection(req, res) {
    let apiAccessToken;
    try {
      apiAccessToken = jwt.verify(cookies["product_hunt_token"], process.env.SECRET);
    } catch (err) {
      apiAccessToken = process.env.PH_APP_CLIENT_CREDENTIALS_TOKEN;
    }
    apiAccessToken ? res.json(true) : res.json(false);
};

module.exports = checkConnection;