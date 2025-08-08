const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// YOUR CODE GOES IN HERE
app.post("/blogs", function (req, res) {
  fs.writeFileSync(req.body.title, req.body.content);
  res.end("ok");
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
