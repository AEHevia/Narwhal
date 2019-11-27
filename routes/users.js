const Users = require("../models/Users");
const Animals = require("../models/Animals");

exports.postUserLogin = async (req, res) => {
  let { email } = req.body;
  const { password } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      sucess: false,
      message: "Error: Password cannot be blank."
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  Users.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        console.log("err: ", err);

        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid password"
        });
      }

      return res.send({
        success: true,
        message: "Login success!",
        userID: user._id
      });
    }
  );
};

exports.postUserRegister = async (req, res) => {
  let { email } = req.body;
  const { password, age, location } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank"
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank"
    });
  }
  if (!age) {
    return res.send({
      success: false,
      message: "Error: Age cannot be blank"
    });
  }
  if (!location) {
    return res.send({
      success: false,
      message: "Error: Location cannot be blank"
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  Users.find(
    {
      email: email
    },
    (err, prevUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error 1"
        });
      }
      if (prevUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exists"
        });
      }

      const newUser = new Users();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.favoriteAnimals = [];
      newUser.age = age;
      newUser.location = location;

      newUser.save((err, user) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error 2"
          });
        }

        return res.send({
          sucesss: true,
          message: "Register success!"
        });
      });
    }
  );
};

/* 
Input:
  {
    userID: "",
    animalID: ""
  }
*/

exports.postUserAddFavorite = async (req, res) => {
  const { userID, animalID } = req.body;

  Users.findById(userID, function(err, user) {
    if (!user) res.status(404).json(err);
    else {
      Animals.findById(animalID, function(err, animal) {
        if (!animal) res.status(404).json(err);
        else {
          user.favoriteAnimals.push(animal.name);
        }

        user.save().then(user => res.json(user));
      });
    }
  });
};

exports.postUserRemoveFavorite = async (req, res) => {
  const { userID, animalID } = req.body;

  Users.findById(userID, function(err, user) {
    if (!user) res.status(404).json(err);
    else {
      Animals.findById(animalID, function(err, animal) {
        if (!animal) res.status(404).json(err);
        else {
          for (let i = 0; i < user.favoriteAnimals.length; i++) {
            if (user.favoriteAnimals[i] == animal.name)
              user.favoriteAnimals.splice(i--, 1);
          }
        }

        user.save().then(user => res.json(user));
      });
    }
  });
};
