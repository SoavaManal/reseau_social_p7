const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token>
    //recuperer le deuxieme element du tableau
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY_SECRET);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
