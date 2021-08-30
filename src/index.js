const express = require("express");
const app = express();
const auth = require("./auth/auth");
const post = require("./posts/post");

app.use(express.json());

app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
