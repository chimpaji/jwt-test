const router = require("express").Router();
const { users } = require("../db/db");

router.get("/", (req, res) => {
  res.send("welcome to auth");
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
