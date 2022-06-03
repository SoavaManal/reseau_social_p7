const models = require("../models");
const fs = require("fs");

//poster un commentaire
exports.createComment = (req, res, next) => {
  models.user
    .findOne({ where: { id: req.auth.userId } })
    .then((user) => {
      models.post.findOne({ where: { id: req.params.postId } }).then((post) => {
        models.comment
          .create({
            userId: user.id,
            postId: post.id,
            content: req.body.content,
            image_url: req.file
              ? `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`
              : null,
          })
          .then(() => res.status(201).json("comment created!!"))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//modifier le commentaire
exports.updateComment = (req, res, next) => {
  models.comment
    .findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        return res.status(401).json({ error: "unauthorized request" });
      }
      if (req.file) {
        if (comment.image_url != null) {
          const filename = comment.image_url.split("/images")[1]; //le nom de l'image a supprimer
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("file deleted!");
            }
          });
        }
      }
      const commentObject = req.file
        ? {
            content: req.body.content,
            image_url: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { content: req.body.content };
      comment
        .update({ ...commentObject }, { where: { id: req.params.id } })
        .then(() => {
          res.status(201).json({ message: "Comment edit !", commentObject });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//suppression de commentaire
exports.deleteComment = (req, res, next) => {
  models.comment
    .findOne({ where: { postId: req.params.postId, id: req.params.id } })
    .then((comment) => {
      console.log(comment.userId);
      console.log(req.auth.userId);
      if (comment.userId == req.auth.userId || req.auth.isAdmin == 1) {
        //nom du fichier à supprimer
        if (comment.image_url != null) {
          const filename = comment.image_url.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            comment
              .destroy({
                where: { postId: req.params.postId, id: req.params.id },
              })
              .then(() => {
                res.status(201).json({ message: "Comment delete !" });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          });
        } else {
          comment
            .destroy({
              where: { postId: req.params.postId, id: req.params.id },
            })
            .then(() => {
              res.status(201).json({ message: "Comment delete !" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        }
      } else {
        return res.status(401).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "le commentaire n'existe pas dans la bd" })
    );
};

//lire les commentaire
exports.readComment = (req, res, next) => {
  models.comment
    .findAll({
      include: [
        {
          model: models.user,
          attributes: ["firstName", "lastName", "image"],
        },
      ],
    })
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ error: "no comment found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
