"use strict";
const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization," +
        "GET, PUT, POST, DELETE, PATCH, OPTIONS, post");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
});
app.use(cors());
app.use("/api/breweries", require("./api/controllers/breweries/breweries"));
//# sourceMappingURL=server.js.map