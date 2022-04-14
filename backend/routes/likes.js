const express = require("express");
const router = express.Router();
const likesControle = require("../controlles/likes");
const auth = require("../middlware/auth");

router.post("/:id", auth, likesControle.likes);

module.exports = router;
