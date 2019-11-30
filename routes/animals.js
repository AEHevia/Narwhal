const Animal = require("../models/Animals");
const random = require("mongoose-simple-random");

// @route   GET api/animals/getall
// @desc    Gets all animal information
// @access  Public
exports.getAnimalsGetAllAnimals = async (req, res) => {
  Animal.find()
    .then(animals => res.json(animals))
    .catch(err => console.log("Error in animals/getall: " + err));
};

// @route   GET api/animals
// @desc    Gets information about the specified animal
// @access  Public
exports.getAnimalsFindName = async (req, res) => {
  let name = req.params.name.toLowerCase();
  Animal.find({ name: name }, function(err, docs) {
    if (err) {
      return res.json(err);
    }
    if (docs.length)
      return res.json({
        success: true,
        animal: docs
      });

    // Handle animal is not in DB
    return res.json({
      success: false
    });
  });
};

// @route   POST api/animals
// @desc    Posts new animal & info to database
// @access  Public
exports.postAnimalsAdd = async (req, res) => {
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
};

exports.getRandomAnimal = async (req, res) => {
  Animal.random(function(err, animal) {
    if (!err) {
      res.json(animal);
    } else {
      console.log("Error in animals/getRandom: " + err);
    }
  });
};
