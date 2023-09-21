//Application to generate content based on input prompts. 
//The app uses Google cloud Vertex AI
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { generateBlog } = require("./vertex");
require('dotenv').config();
const app = express();
const PORT = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "view")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));

//Running the app on the specified port
app.listen(PORT, () => {
  console.log(`App started on localhost:${PORT} `);
});

//Load index.html with textboxes to take prompt inputs
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

//Call generate-blog endpoint to fetch results from vertex AI apis
app.post("/generate-blog", async (req, res) => {
  const result = await generateBlog(req.body.prompt);
  return res.render("result", { result, prompt: req.body.prompt });
});

app.get("/generate-blog", async (req, res) => {
  return res.redirect("/");
});
