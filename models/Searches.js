const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  animalName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  count: {
    type: Number
  }
});

module.exports = Searches = mongoose.model("searches", SearchSchema);
