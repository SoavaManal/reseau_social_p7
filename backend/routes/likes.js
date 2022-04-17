const express = require("express");
const router = express.Router();
const likesControle = require("../controlles/likes");
const auth = require("../middlware/auth");

router.post("/:id/likes", auth, likesControle.likes);

module.exports = router;
