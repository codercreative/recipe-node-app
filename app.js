const express = require("express");
const path = require("path"); // built in with Node
const recipesRouter = require("./routes/recipes");

const app = express();

//set up static public folder
app.use(express.static("./public"));

//parse html form data
app.use(express.urlencoded({ extended: true }));

// parse JSON data from browser into req.body
app.use(express.json());

//===Routes and Middleware===
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.use("/recipes", recipesRouter);

//Catch all 404 middleware
app.use((req, res) => {
  res.status(404).send("<h1>This resource does not exist!</h1>");
});

//===Listening to port===
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

console.log("Recipe app is up");

//  / - public landing page with register and login button
//  /register - public registration
//  /login - public login
//  /recipes - requires authorization for user to access
