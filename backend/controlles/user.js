const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const fs = require("fs");

//s'inscrire
exports.signup = (req, res, next) => {
  //verrifier si un des paramettre non null n'est pas renseigner
  if (
    req.body.firstName === null ||
    req.body.lastName === null ||
    req.body.email === null ||
    req.body.password === null
  ) {
    return res.status(400).json({ errors: "Manque des parameters" });
  }
  //verrifier le nom et le prenom
  if (req.body.firstName.length < 3 || req.body.firstName.length >= 13) {
    return res
      .status(400)
      .json({ errors: "Le prenom doit contenir entre (4-12) caractéres" });
  }
  if (req.body.lastName.length < 3 || req.body.lastName.length >= 13) {
    return res
      .status(400)
      .json({ errors: "Le nom doit contenir entre (4-12) caractéres" });
  }

  //verrifier l'email est le password avec des regex
  //regex : emailregex.com
  const emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailValidator.test(req.body.email)) {
    return res.status(400).json({ errors: "email n'est pas valid!!" });
  }

  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;
  if (!passwordValidator.test(req.body.password)) {
    return res.status(400).json({
      errors:
        "Mot de passe faible:*8 caractéres min*une majuscule ou plusieurs*une miniscule ou plusieurs*un chiffre ou plusieurs",
    });
  }
  models.user
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      if (user) {
        res.status(400).json({ errors: "Cet email exist déja" });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const newUser = models.user
            .create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              bio: req.body.bio,
              image: req.file
                ? `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`
                : null,
              isAdmin: 0,
            })
            .then(res.status(201).json({ message: "User has been created" }))
            .catch(() => res.status(400).json({ error: "bad request" }));
        });
      }
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//se connecter
exports.login = (req, res, next) => {
  models.user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ errors: "Email n'exist pas!" });
      } else if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ errors: "Mot de passe incorrect" });
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
            res.status(500).json({ errors: "can't compare the password" })
          );
      }
    })
    .catch(() => res.status(500).json({ errors: "can't access the database" }));
};

//le profil d'utilisateur
exports.getUserInfo = (req, res, next) => {
  models.user
    .findOne({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "bio",
        "image",
        "isAdmin",
      ],
      where: { id: req.auth.userId },
    })
    .then((user) => {
      if (user.id == req.auth.userId) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json("bad request");
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllUser = (req, res, next) => {
  models.user
    .findAll({
      attributes: ["id", "firstName", "lastName", "image", "bio", "email"],
    })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(400).json({ error: "bad request" }));
};

//modifier le profile
exports.updateUserInfo = (req, res, next) => {
  var bio = req.body.bio;
  var image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
  models.user
    .findOne({
      attributes: ["id", "firstName", "lastName", "bio", "image"],
      where: { id: req.auth.userId },
    })
    .then((user) => {
      if (user.id != req.auth.userId) {
        return res.status(401).json({ error: "unauthorized request" });
      }
      if (req.file) {
        if (user.image !== null) {
          const filename = user.image.split("/images")[1]; //le nom de l'image a supprimer
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("file deleted!");
            }
          });
        }
      }
      user
        .update(
          {
            image: image ? image : user.image,
            bio: bio ? bio : user.bio,
          },
          { where: { id: req.auth.userId } }
        )
        .then(() =>
          res.status(201).json({ message: "profile has been modified" })
        )
        .catch(() => res.status(400).json({ error: "bad request" }));
    });
  // .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//suppression du compte par utilisateur
exports.deleteUser = (req, res, next) => {
  models.user
    .findOne({ where: { id: req.auth.userId } })
    .then((user) => {
      if (user.id == req.auth.userId || req.auth.isAdmin == 1) {
        const filename = user.image.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .destroy({ where: { id: req.auth.userId } })
            .then(() =>
              res.status(200).json({ message: "user has been deleted" })
            )
            .catch(() => res.status(400).json({ error: "bad request" }));
        });
      } else {
        return res.status(401).json({ error: "unauthorized request" });
      }
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};

//suppression du compte par admin
exports.deleteBadUsers = (req, res, next) => {
  models.user
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (req.auth.isAdmin == 1) {
        if (user.image !== null) {
          const filename = user.image.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            user
              .destroy({ where: { id: req.auth.userId } })
              .then(() =>
                res.status(200).json({ message: "user has been deleted" })
              )
              .catch(() => res.status(400).json({ error: "bad request" }));
          });
        } else {
          user
            .destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "user has been deleted" })
            )
            .catch(() => res.status(400).json({ error: "bad request" }));
        }
      } else {
        return res.status(401).json({ error: "unauthorized request" });
      }
    })
    .catch(() => res.status(500).json({ error: "can't access the database" }));
};
