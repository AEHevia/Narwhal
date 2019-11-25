const express = require("express");
const router = express.Router();

// Animal Model
const Animal = require("../../models/Animals");

// @route   GET api/animals/getall
// @desc    Gets all animal information
// @access  Public
router.get("/getall", (req, res) => {
  Animal.find()
    .then(animals => res.json(animals))
    .catch(err => console.log("Error in animals/getall: " + err));
});

// @route   GET api/animals
// @desc    Gets information about the specified animal
// @access  Public
router.get("/", (req, res) => {
  Animals.find({ name: req.body.name.toLowerCase() })
    .then(animal => res.json(animal))
    .catch(err => console.log("Error in animals/get: " + err));
});

// @route   POST api/animals
// @desc    Posts new animal & info to database
// @access  Public
router.post("/", (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    image: req.body.image,
    scientificName: req.body.scientificName,
    lifespan: req.body.lifespan,
    weight: req.body.weight,
    summary: req.body.summary,
    located: req.body.located,
    taxonomy: req.body.taxonomy,
    facts: req.body.facts,
    url: req.body.url
  });

  newAnimal.save().then(animal => res.json(animal));
});

module.exports = router;
