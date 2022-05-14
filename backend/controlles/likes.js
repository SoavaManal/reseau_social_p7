const models = require("../models");

exports.likes = (req, res, next) => {
  models.post.findOne({ where: { id: req.params.id } }).then((post) => {
    models.user.findOne({ where: { id: req.auth.userId } }).then((user) => {
      console.log("pamsid:", req.params.id);
      models.usersliked
        .findOne({ where: { postId: req.params.id, userId: user.id } })
        .then((usersliked) => {
          if (!usersliked) {
            post
              .update(
                { likes: post.likes + 1 },
                { where: { id: req.params.id } }
              )
              .then(() => {
                res.status(201).json({ message: "Post liked!" });

                models.usersliked.create({
                  userId: user.id,
                  postId: post.id,
                  like: 1,
                });
              })
              .catch((error) => res.status(404).json({ error }));
          } else {
            // post
            //   .update(
            //     { likes: post.likes - 1 },
            //     { where: { id: req.params.id } }
            //   )
            //   .then(() => {
            //     res.status(201).json({ message: "The like is removed!" });
            //   })
            //   .catch();
            // models.usersliked
            //   .destory()
            //   .then(() =>
            //     res
            //       .status(200)
            //       .json({ message: "user is removed from usersLiked" })
            //   )
            //   .catch();
            // });
            return res.status(409).json({ message: "Post already liked" });
          }
        });
      //.catch((error) => res.status(500).json({ error }));
    });
    //.catch((error) => res.status(500).json({ error }));
    // })
    // .catch((error) => res.status(500).json({ error }));
  });
};
