const express = require("express");
const app = express();
const auth = require("./auth/auth");

app.use(express.json());

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
