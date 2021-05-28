const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
const database = new Datastore("database.db");
database.loadDatabase();
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/location/:latlon", async (request, response) => {
  const latlon = request.params.latlon.split(",");
  const latitude = latlon[0];
  const longitude = latlon[1];
  var apikey = process.env.API_KEY;
  var api_url = "https://api.opencagedata.com/geocode/v1/json";
  var request_url =
    api_url +
    "?" +
    "key=" +
    apikey +
    "&q=" +
    encodeURIComponent(latitude + "," + longitude) +
    "&pretty=1" +
    "&no_annotations=1";
  const fetch_response = await fetch(request_url);
  const json = await fetch_response.json();
  response.json(json);
});
