"use strict";
require("dotenv").config();
require("encoding");
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const axios = require("axios");

var cors = require("cors");
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

const router = express.Router();

app.use(cors());

function axiosTest() {
  // create a promise for the axios request
  const promise = axios.post(url, customProducts);
  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);
  // return it
  return dataPromise;
}

router.get("/", async (req, res) => {
  axiosTest()
    .then((data) => {
      res.json({ message: "Request received!", data });
    })
    .catch((err) => console.log(err));
});

router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());

app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
