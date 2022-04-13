const express = require("express");
const app = express();

const path = require("path");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const dotenv = require("dotenv");
dotenv.config(); //utiliser dotenv "acceder aux varriables d'environnement"

//parser le json autre methode body-parser
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
