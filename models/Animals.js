const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  scientificName: {
    type: String
  },
  lifespan: {
    type: String
  },
  weight: {
    type: String
  },
  summary: {
    type: String
  },
  located: [
    {
      type: String
    }
  ],
  taxonomy: {
    kingdom: String,
    phylum: String,
    class: String,
    order: String,
    family: String,
    genus: String,
    species: String
  },
  facts: [
    {
      type: String
    }
  ],
  url: {
    type: String
  }
});

module.exports = Animals = mongoose.model("animals", AnimalSchema);
