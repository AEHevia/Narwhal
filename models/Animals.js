const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
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

AnimalSchema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) return cb(err);
    const rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

module.exports = Animals = mongoose.model("animals", AnimalSchema);
