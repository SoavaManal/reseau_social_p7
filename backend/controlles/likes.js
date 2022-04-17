const models = require("../models");

exports.likes = (req, res, next) => {
  models.post.findOne({ where: { id: req.params.id } }).then((post) => {
    models.user.findOne({ where: { id: req.auth.userId } }).then((user) => {
      models.usersliked
        .findOne({ where: { postId: post.id, userId: user.id } })
        .then((usersliked) => {
          if (!usersliked) {
            models.usersliked
              .create({
                postId: post.id,
                userId: user.id,
                like: 1,
              })
              .then(() => {
                if (usersliked.like == 1) {
                  post
                    .update(
                      { likes: req.body.likes + 1 },
                      { where: { id: req.params.id } }
                    )
                    .then(() =>
                      res.status(201).json({ message: "Post liked!" })
                    );
                  //.catch();
                }
              });
            //catch()
          } else {
            return res.status(400).json({ error: "Post already liked" });
          }
        });
      //.catch((error) => res.status(500).json({ error }));
    });
    //.catch((error) => res.status(500).json({ error }));
  });
  //.catch((error) => res.status(500).json({ error }));
};
