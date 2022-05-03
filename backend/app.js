const express = require("express");
const app = express();

const path = require("path");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const likesRouter = require("./routes/likes");

const dotenv = require("dotenv");
dotenv.config(); //utiliser dotenv "acceder aux varriables d'environnement"

//parser le json autre methode body-parser
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
app.use("/api/posts", commentRouter);
app.use("/api/posts", likesRouter);

module.exports = app;
