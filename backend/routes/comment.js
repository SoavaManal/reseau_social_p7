const express = require("express");
const router = express.Router();
const commentControl = require("../controlles/comment");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/:postId/comment", auth, multer, commentControl.createComment);
router.put("/:postId/comment/:id", auth, multer, commentControl.updateComment);
router.delete(
  "/:postId/comment/:id",
  auth,
  multer,
  commentControl.deleteComment
);
router.get("/:postId/comment", auth, commentControl.readComment);

module.exports = router;
