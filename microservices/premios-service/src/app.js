
const express = require("express");


const premios = require("../routes/premios");


const app = express();

app.use("/api/v2/premios", premios);


module.exports = app;
