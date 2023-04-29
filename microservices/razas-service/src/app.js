
const express = require("express");

const razas = require("../routes/razas");

const app = express();

app.use("/api/v2/razas", razas);

module.exports = app;


