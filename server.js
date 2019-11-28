const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

// Create the server using Express
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// Loads keys based on production deploy or localhost
var db;
var env = process.env.NODE_ENV || "dev";
console.log("Starting up the server in " + env + " mode");
switch (env) {
  case "dev":
    db = require("./config/keys").mongoURI; // our access key for the database
    break;
  case "production":
    db = process.env.mongoURI;
    break;
}

// Connect to Mongo
mongoose
  .connect(String(db), { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

// Import the routes
const routes = require("./routes");

// User APIs
app.post("/api/user/login", routes.postUserLogin);
app.post("/api/user/register", routes.postUserRegister);

// Animal APIs
app.get("/api/animals/getall", routes.getAnimalsGetAllAnimals);
app.get("/api/animals/:name", routes.getAnimalsSearch);
app.post("/api/animals/", routes.postAnimalsAdd);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Connected on port ${port}`));
