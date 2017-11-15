"use strict";

// Basic express setup:

const PORT          = 8888;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  res.setHeader(`Cache-Control`, `no-cache`);
  next();
 });

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://test:test@ds259105.mlab.com:59105/ecoation";
MongoClient.connect(MONGODB_URI, (err, db) => {

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const Routes = require("./routes/routes")(DataHelpers);

  app.use("/api", Routes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
