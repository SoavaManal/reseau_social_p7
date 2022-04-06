const express = require("express");
const router = express.Router();
const userControl = require("../controlles/user");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/signup", multer, userControl.signup);
router.post("/login", userControl.login);
router.get("/", userControl.getUserInfo);
router.put("/me", auth, userControl.updateUserInfo);
router.delete("/me", auth, userControl.deleteUser);

module.exports = router;
