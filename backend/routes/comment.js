const express = require("express");
const router = express.Router();
const commentControl = require("../controlles/comment");

router.post("/", commentControl.createComment);
router.put("/", commentControl.updateComment);
router.delete("/", commentControl.deleteComment);
router.get("/", commentControl.readComment);

module.exports = router;
