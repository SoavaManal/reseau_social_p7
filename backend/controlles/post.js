const models = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  models.user.findOne({ where: { id: req.auth.userId } }).then((user) => {
    models.post
      .create({
        userId: user.id,
        content: req.body.content,
        /*image_url: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,*/
      })
      .then(() => res.status(201).json("Post created!!"))
      .catch((error) => res.status(404).json({ error }));
  });
  //.catch((error) => res.status(500).json({ error }));
};

exports.updatePost = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        return res.status(401).json({ error: "unauthorized request" });
      }
      if (req.file) {
        const filename = post.image_url.split("/images")[1]; //le nom de l'image a supprimer
        fs.unlink(`images/${filename}`, function (error) {
          //supression de l'ancienne image
          if (error) {
            throw error;
          }
        });
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

exports.deletePost = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error("post unexist"),
        });
      }
      if (post.userId !== req.auth.userId) {
        console.log(post);
        console.log(post.userId);
        console.log(req.auth.userId);
        return res.status(401).json({ message: "Unauthorized request" });
      }
      //nom du fichier à supprimer
      //const filename = post.image_url.split("/images")[1];
      //fs.unlink(`images/${filename}`, () => {
      post
        .destroy({ where: { _id: req.params.id } })
        .then(() => {
          res.status(201).json({ message: "Post delete !" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      // });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.readAllPost = (req, res, next) => {
  models.post
    .findAll({
      include: [
        {
          model: models.user,
          attributes: ["firstName", "lastName"],
        },
      ],
    })
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.readOnePost = (req, res, next) => {};