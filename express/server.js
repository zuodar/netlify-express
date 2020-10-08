"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js! 20:34</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body, test: "20:34" }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
// app.use("/", router);
module.exports = app;
module.exports.handler = serverless(app);

// "use strict";
// require("dotenv").config();
// require("encoding");
// const cors = require("cors");

// const express = require("express");
// const path = require("path");
// const serverless = require("serverless-http");
// const app = express();
// const bodyParser = require("body-parser");
// const axios = require("axios");

// const homePage = "https://tycho.pl/cstmpl";
// const url = `${homePage}/wp-json/wc/v3/products/batch?consumer_key=${process.env.consumer_key}&consumer_secret=${process.env.consumer_secret}`;
// const customProducts = {
//   create: [
//     {
//       name:
//         " \n <h3>S60 System do drzwi przesuwnych na 1 skrzydło drzwi <br /></h3> \n <h5>Prowadnica: 180 cm <br />\n Mocowanie: Do stropu <br />\n \n \n \n \n \n Miękkie domykanie: Nie</h5>",
//       regular_price: "115.60 zł",
//       short_description: 1,
//     },
//   ],
// };

// const router = express.Router();

// app.use(cors());

// function axiosTest() {
//   const promise = axios.post(url, customProducts);
//   const dataPromise = promise.then((response) => response.data);
//   return dataPromise;
// }

// router.post("/", async (req, res) => {
//   axiosTest()
//     .then((data) => {
//       console.log("I will be sending json now!");
//       res.json({ message: "Request received!, 20:06", data });
//     })
//     .catch((err) => console.log(err));
// });

// app.use("/.netlify/functions/server", router); // path must route to lambda
// // app.use("/", router); // path must route to lambda

// app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

// module.exports = app;
// module.exports.handler = serverless(app);
