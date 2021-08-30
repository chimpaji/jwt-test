const router = require("express").Router();
const { users } = require("../db/db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWT = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("welcome to auth");
});

router.get("/all", (req, res) => {
  res.json(users);
});

router.post(
  "/signup",
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = users.find((user) => user.email === req.body.email);
    if (user) {
      return res.status(400).json({ errors: { msg: "User already exists" } });
    }

    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    users.push({ email: req.body.email, password: hashPassword });
    res.json({
      status: "Create user sucess",
      email: req.body.email,
      password: hashPassword,
    });
  }
);

router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = users.find((user) => user.email === req.body.email);
  if (!user) {
    return res
      .status(400)
      .json({ errors: { msg: "Credential incorrect(email not found)" } });
  }

  const hashPassword = user.password;

  const isMatch = await bcrypt.compare(req.body.password, hashPassword);

  if (!isMatch) {
    return res.status(400).json({ errors: { msg: "Credential incorrect" } });
  }

  const token = await JWT.sign({ email }, "SECRET_CODE", {
    expiresIn: 60 * 60,
  });
  // res.header("token", token);
  res.status(200).json({ msg: "Cool! you login successfully", token });
});

module.exports = router;
