// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || process.env.PORT || 3000;

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, listening);
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
}

// GET route
app.get("/getWeather", getInfo);

function getInfo(request, response) {
  response.send(projectData);
}

app.get('/allData', getAll);

function getAll(req, res) {
  res.send(projectData);
}

// POST route
app.post("/addFeelings", addFeelings);

function addFeelings(req, res) {
  projectData.feelings = req.body.feelings;
  projectData.date = req.body.date;
  projectData.temperature = req.body.temperature;
  res.send(projectData);
}
