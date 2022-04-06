const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
//const auth = require("../middlware/auth");

exports.signup = (req, res, next) => {
  models.user
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "user already exist" });
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const newUser = models.user
            .create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              bio: req.body.bio,
              isAdmin: false,
            })
            .then(res.status(201).json({ message: "User has been created" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    });
};

exports.login = (req, res, next) => {
  models.user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "user does not exist" });
      } else if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: "incorrect password" });
            } else if (valid) {
              res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user._id },
                  process.env.TOKEN_KEY_SECRET,
                  {
                    expiresIn: "5h",
                  }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserInfo = (req, res, next) => {
  models.users
    .findOne({
      // attributes: ["firstName", "lastName", "email", "bio"],
      where: { id: req.params.userId },
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateUserInfo = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
