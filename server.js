const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const animals = require("./routes/api/animals");
const users = require("./routes/api/users");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

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

// Use Routes
app.use("/api/animals", animals);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Connected on port ${port}`));