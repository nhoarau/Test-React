
const express = require('express');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");


// Get token after response code from productHunt api auth
async function getToken(req, res) {
    const accessToken = {
        code: req.query && req.query.code,
        client_id: process.env.PH_APP_API_KEY,
        client_secret: process.env.PH_APP_API_SECRET,
        redirect_uri: process.env.PH_APP_REDIRECT_URI,
        grant_type: "authorization_code"
    };

    const response = await fetch(`https://api.producthunt.com/v2/oauth/token`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accessToken)
    });

    const tokenJSON = await response.json();

    if (!accessToken) {
       return res.redirect("http://localhost:4200");
    }
    
    const authToken = jwt.sign(accessToken, process.env.SECRET);
    res.cookie("product_hunt_token", authToken);
    res.redirect("http://localhost:4200");  
}

module.exports = getToken;