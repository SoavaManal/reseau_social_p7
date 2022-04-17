const express = require("express");
const router = express.Router();
const commentControl = require("../controlles/comment");
const auth = require("../middlware/auth");

router.post("/:postId/comment", auth, commentControl.createComment);
router.put("/:postId/comment/:id", auth, commentControl.updateComment);
router.delete("/:postId/comment/:id", auth, commentControl.deleteComment);
router.get("/:postId/comment", auth, commentControl.readComment);

module.exports = router;
