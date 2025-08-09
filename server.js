// const { error } = require("console");
const express = require("express");
const fs = require("fs");
// const { title } = require("process");
const app = express();
app.use(express.json());

// YOUR CODE GOES IN HERE
app.post("/blogs", function (req, res) {
  fs.writeFileSync(req.body.title, req.body.content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;
  // How to get the title and content from the request?
  // What if the request does not have a title and/or content?
  if (!content) {
    res.status(400);
    res.json({ error: "Content is required" });
  } else if (fs.existsSync(title)) {
    try {
      fs.writeFileSync(title, content);
      res.statusCode = 200;
      res.setHeader("Content-type", "text-plain");
      res.end("ok");
    } catch (error) {
      res.status(500);
      res.send({ error: "Error updating the post" });
    }
  } else {
    res.statusCode = 404;
    res.send({ error: "Post not found" });
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  // How to get the title from the url parameters?
  if (fs.existsSync(title)) {
    try {
      res.statusCode = 200;
      res.setHeader("Content-type", "text-plain");
      res.end("ok");
    } catch (error) {
      res.status(500);
      res.send({ error: "Error deleting the post" });
    }
  } else {
    res.statusCode = 404;
    res.send({ error: "Post not found" });
  }
});

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    try {
      const post = fs.readFileSync(title);
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(post);
    } catch (error) {
      res.status(500);
      res.send({ error: "Error retrieving the post" });
    }
  } else {
    res.statusCode = 404;
    res.send({ error: "Post not found" });
  }
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
