const models = require("../models");

exports.likes = (req, res, next) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      models.user
        .findOne({ where: { id: req.auth.userId } })
        .then((user) => {
          models.usersliked
            .findOne({ where: { postId: post.id, userId: user.id } })
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
                return res.status(409).json({ error: "Post already liked" });
              }
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
