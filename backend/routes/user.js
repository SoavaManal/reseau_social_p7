const express = require("express");
const router = express.Router();
const userControl = require("../controlles/user");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/signup", multer, userControl.signup);
router.post("/login", userControl.login);
router.get("/:id", auth, userControl.getUserInfo);
router.get("/", auth, userControl.getAllUser);
router.put("/:id", auth, multer, userControl.updateUserInfo);
router.delete("/:id", auth, multer, userControl.deleteUser);

module.exports = router;
