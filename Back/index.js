const express = require('express');
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const app = express();

require('dotenv').config()
app.use(cors());
app.options('*', cors());

const handleAuthorize = require("./routes/productHuntAuth");
const checkConnection = require("./routes/checkConnection");
const getToken = require("./routes/token");
const getProducts = require("./routes/products");

// Use for Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Routes methods
app.get("/authorize", handleAuthorize)
   .get("/callback", getToken)
   .get("/products", getProducts)
   .get("/checkAuthorize", checkConnection);


// Certificate Https
const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

sslServer.listen(5500, function() {
    console.log(`API explorer app is listening on port 5500`);
});

// chrome://flags/