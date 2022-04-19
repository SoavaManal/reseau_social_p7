const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

//s'inscrire
exports.signup = (req, res, next) => {
  //verrifier si un des paramettre non null n'est pas renseigner
  if (
    req.body.firstName == null ||
    req.body.lastName == null ||
    req.body.email == null ||
    req.body.password == null
  ) {
    return res.status(400).json({ error: "missing parameters" });
  }
  //verrifier le nom et le prenom
  if (req.body.firstName.length <= 3 || req.body.firstName.length >= 13) {
    return res.status(400).json({ error: "firstName must be lenght (4-12)" });
  }
  if (req.body.lastName.length <= 3 || req.body.lastName.length >= 13) {
    return res.status(400).json({ error: "lastName must be lenght (4-12)" });
  }

  //verrifier l'email est le password avec des regex
  //regex : emailregex.com
  const emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailValidator.test(req.body.email)) {
    return res.status(400).json({ error: "email not valid!!" });
  }

  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;
  if (!passwordValidator.test(req.body.password)) {
    return res.status(400).json({ error: "weak password" });
  }

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
              isAdmin: 0,
            })
            .then(res.status(201).json({ message: "User has been created" }))
            .catch(() => res.status(400).json({ error: "bad request" }));
        })
        .catch(() =>
          res.status(500).json({ error: "cannot hash the password" })
        );
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//se connecter
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
                  { userId: user.id, isAdmin: user.isAdmin },
                  process.env.TOKEN_KEY_SECRET,
                  {
                    expiresIn: "5h",
                  }
                ),
              });
            }
          })
          .catch(() =>
            res.status(500).json({ error: "can't compare the password" })
          );
      }
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//Read the profile of users
exports.getUserInfo = (req, res, next) => {
  models.user
    .findOne({
      attributes: ["firstName", "lastName", "email", "bio"],
      where: { id: req.params.id },
    })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(400).json({ error: "bad request" }));
};

//modifier le profile
exports.updateUserInfo = (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var bio = req.body.bio;

  models.user
    .findOne({
      attributes: ["id", "firstName", "lastName", "bio"],
      where: { id: req.params.id },
    })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        return res.status(401).json({ error: "unauthorized request" });
      }
      user
        .update({
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
          bio: bio ? bio : user.bio,
        })
        .then(() =>
          res.status(201).json({ message: "profile has been modified" })
        )
        .catch(() => res.status(400).json({ error: "bad request" }));
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//suppression du compte
exports.deleteUser = (req, res, next) => {
  models.user
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      console.log(user);
      if (user.id == req.auth.userId || req.auth.isAdmin == 1) {
        models.post
          .findOne({ where: { userId: user.id } })
          .then((posts) => {
            if (posts) {
              posts.destroy({ where: { userId: user.id } });
            }
          })
          .catch(() => res.status(400).json({ error: "bad request" }));
        user
          .destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "user has been deleted" })
          )
          .catch(() => res.status(400).json({ error: "bad request" }));
      } else {
        return res.status(401).json({ error: "unauthorized request" });
      }
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};
