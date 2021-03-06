const models = require("../models");
const fs = require("fs");

//poster un post
exports.createPost = (req, res, next) => {
  models.user
    .findOne({ where: { id: req.auth.userId } })
    .then((user) => {
      models.post
        .create({
          userId: user.id,
          content: req.body.content,
          likes: 0,
          image_url: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
        })
        .then(() => res.status(201).json("Post created!!"))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//modification du post
exports.updatePost = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        return res.status(401).json({ error: "unauthorized request" });
      }
      if (req.file) {
        if (post.image_url != null) {
          const filename = post.image_url.split("/images")[1]; //le nom de l'image a supprimer
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("file deleted!");
            }
          });
        }
      }
      const postObject = req.file
        ? {
            content: req.body.content,
            image_url: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { content: req.body.content };
      post
        .update({ ...postObject }, { where: { id: req.params.id } })
        .then(() => {
          res.status(201).json({ message: "Post edit !", postObject });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//suppression du post
exports.deletePost = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error("post unexist"),
        });
      }
      if (post.userId == req.auth.userId || req.auth.isAdmin == 1) {
        //nom du fichier ?? supprimer
        if (post.image_url !== null) {
          const filename = post.image_url.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            post
              .destroy({ where: { id: req.params.id } })
              .then(() => {
                res.status(201).json({ message: "Post delete !" });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          });
        } else {
          post
            .destroy({ where: { id: req.params.id } })
            .then(() => {
              res.status(201).json({ message: "Post delete !" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        }
      } else {
        return res.status(401).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//lecture des posts
exports.readAllPost = (req, res, next) => {
  models.post
    .findAll({
      include: [
        {
          model: models.usersliked,
          attributes: ["userId"],
        },
        {
          model: models.user,
          attributes: ["firstName", "lastName", "image"],
        },
      ],
    })
    .then((post) => {
      if (post) {
        res.status(200).json(post.reverse());
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
