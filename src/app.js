const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vijay",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vijay",
  });
});

// Using one /help route to serve the help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vijay",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forecast: forecastData,
      address: req.query.address,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// Handling 404 for unspecified routes
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vijay",
    errorMsg: "Page not found.",
  });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
