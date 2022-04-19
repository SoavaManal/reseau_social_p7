const express = require("express");
const router = express.Router();
const postControl = require("../controlles/post");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/", auth, multer, postControl.createPost);
router.put("/:id", auth, multer, postControl.updatePost);
router.delete("/:id", auth, postControl.deletePost);
router.get("/", auth, postControl.readAllPost);
router.get("/:id", auth, postControl.readOnePost);

module.exports = router;
