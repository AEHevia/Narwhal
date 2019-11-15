const express = require('express');
const router = express.Router();
const AnimalSchema = require('../../models/Animals');

router.route('/:name').get((req, res) => {
  let name = req.params.name;
  AnimalSchema.find({name: name}, function(err, docs) {
    if (err) {
      return res.json(err);
    }
    if (docs.length)
      return res.json({
        "success": true,
        "animal": docs
      });

    // Handle animal is not in DB
    return res.json({
      "success": false
    });
  })
})

router.route('/addAnimal').post(function(req, res) {
  let animal = new AnimalSchema(req.body);
  animal.save().then(suc => {
    res.status(200).json({animal});
  }).catch(err => {
    res.status(400).send("Something went wrong.");
  })
});

module.exports = router;
