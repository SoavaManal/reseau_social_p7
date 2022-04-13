const express = require("express");
const router = express.Router();
const userControl = require("../controlles/user");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/signup", multer, userControl.signup);
router.post("/login", userControl.login);
router.get("/:id", auth, userControl.getUserInfo);
router.put("/:id", auth, userControl.updateUserInfo);
router.delete("/:id", auth, userControl.deleteUser);

module.exports = router;
