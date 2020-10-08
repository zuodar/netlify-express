"use strict";
require("dotenv").config();
require("encoding");
const cors = require("cors");
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const createProduct = require("./createProduct");

app.use(cors());

router.get("/", async (req, res) => {
  const product = req.query.product;
  if (!product) {
    res.send("no product provided");
    return;
  }
  createProduct(product)
    .then((data) => {
      res.send({
        message: `Request received!, Created this product: ${product}`,
      });
    })
    .catch((err) => console.log(err));
});

app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", router); // path must route to lambda

app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
