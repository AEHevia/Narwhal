const Animal = require("../models/Animals");
const Users = require("../models/Users");
const Search = require("../models/Searches");
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

exports.postAnimalTrackQuery = async (req, res) => {
  const { userID } = req.body;
  let animalName = req.body.animalName.toLowerCase();
  let today = new Date();

  Users.findById(userID, function(err, user) {
    if (!user) {
      res.send({
        success: false,
        message: "User not found."
      });
    } else if (today.getFullYear() - user.age.getFullYear() < 13) {
      res.send({
        success: false,
        message: "User not 13 or older."
      });
    } else {
      Search.findOne({ animalName: animalName }, function(err, search) {
        if (err) {
          return res.json(err);
        }
        if (search) {
          search.count = search.count + 1;

          search
            .save()
            .then(search => res.send({ success: true, search: search }));
        } else {
          const newSearch = new Search({
            animalName: animalName,
            count: 1
          });

          newSearch.save().then(search =>
            res.json({
              success: true,
              search: search
            })
          );
        }
      });
    }
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
