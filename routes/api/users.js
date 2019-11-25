const express = require("express");
const router = express.Router();

const User = require("../../models/Users");

router.post("/login", (req, res) => {
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
});

router.post("/register", (req, res) => {
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
});

module.exports = router;
