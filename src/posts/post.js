const checkAuth = require("../middleware/checkAuth");

const router = require("express").Router();

const publicPost = [
  { title: "Public post", premium: false },
  { title: "Public post", premium: false },
  { title: "Public post", premium: false },
];

const paidPost = [
  { title: "Paid post", premium: true },
  { title: "Paid post", premium: true },
  { title: "Paid post", premium: true },
];

router.get("/public", (req, res) => {
  res.json(publicPost);
});
router.get("/private", checkAuth, (req, res) => {
  res.json(paidPost);
});

module.exports = router;
