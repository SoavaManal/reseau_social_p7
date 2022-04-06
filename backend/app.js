const express = require("express");
const app = express();

const userRouter = require("./routes/user");

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

app.use("/api/auth", userRouter);

module.exports = app;
