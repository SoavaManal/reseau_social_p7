const models = require("../models");
const fs = require("fs");

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
            image_url: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          })
          .then(() => res.status(201).json("comment created!!"))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.updateComment = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.postId } })
    .then((post) => {
      console.log(post);
      models.comment
        .findOne({ where: { userId: req.auth.userId } })
        .then((comment) => {
          console.log(comment);
          if (comment.userId !== req.auth.userId) {
            return res.status(401).json({ error: "unauthorized request" });
          }
          if (req.file) {
            const filename = comment.image_url.split("/images")[1]; //le nom de l'image a supprimer
            fs.unlink(`images/${filename}`, function (error) {
              //supression de l'ancienne image
              if (error) {
                throw error;
              }
            });
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
              res.status(201).json({ message: "Comment edit !" });
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.deleteComment = (req, res, next) => {
  models.comment
    .findOne({ where: { postId: req.params.postId, id: req.params.id } })
    .then((comment) => {
      if (comment.userId == req.auth.userId || req.auth.isAdmin == 1) {
        //nom du fichier à supprimer
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
        return res.status(401).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.readComment = (req, res, next) => {
  models.comment
    .findAll({
      include: [
        {
          model: models.user,
          attributes: ["firstName", "lastName"],
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
