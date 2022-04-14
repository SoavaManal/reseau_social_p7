const express = require("express");
const router = express.Router();
const commentControl = require("../controlles/comment");
const auth = require("../middlware/auth");

router.post("/:id", auth, commentControl.createComment);
router.put("/:id", auth, commentControl.updateComment);
router.delete("/:id", auth, commentControl.deleteComment);
router.get("/", auth, commentControl.readComment);

module.exports = router;
