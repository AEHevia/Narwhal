const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

let Animals = require("./routes/api/animals");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://jacob:sgisGnZgLXLTNsCP@narwhal-ffz9k.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/animals", Animals);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
