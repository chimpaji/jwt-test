const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //   const token = req.headers("x-auth-token");
  if (!req.headers.token) {
    res.json(400).send("Unathorized! Please login");
  }
  try {
    JWT.verify(req.headers.token, "nfb32iur32ibfqfvi3vf932bg932g932");
    next();
  } catch (error) {
    res.status(400).send({ errrors: { msg: "Invalid token" } });
  }
};
