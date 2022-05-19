const express = require("express");
const router = express.Router();
const userControl = require("../controlles/user");
const auth = require("../middlware/auth");
const multer = require("../middlware/multer-config");

router.post("/signup", multer, userControl.signup); //fait coté frontend
router.post("/login", userControl.login); //fait coté frontend
router.get("/me", auth, userControl.getUserInfo);
router.get("/", auth, userControl.getAllUser); //fait coté frontend
router.put("/me", auth, multer, userControl.updateUserInfo);
router.delete("/me", auth, multer, userControl.deleteUser);
router.delete("/:id", auth, multer, userControl.deleteBadUsers);

module.exports = router;
