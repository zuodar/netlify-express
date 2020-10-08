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

const homePage = "https://tycho.pl/cstmpl";
const url = `${homePage}/wp-json/wc/v3/products/batch?consumer_key=${process.env.consumer_key}&consumer_secret=${process.env.consumer_secret}`;
const customProducts = {
  create: [
    {
      name:
        " \n <h3>S60 System do drzwi przesuwnych na 1 skrzydło drzwi <br /></h3> \n <h5>Prowadnica: 180 cm <br />\n Mocowanie: Do stropu <br />\n \n \n \n \n \n Miękkie domykanie: Nie</h5>",
      regular_price: "115.60 zł",
      short_description: 1,
    },
  ],
};

function createProduct(product) {
  console.log(
    "im still using const from above, but I already got this data:",
    JSON.parse(product)
  );
  const promise = axios.post(url, customProducts);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

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
