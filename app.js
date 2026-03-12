const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const notFound = require("./middleware/not-found");
const authRouter = require("./routes/auth");
const recipesRouter = require("./routes/recipes");
const errorHandler = require("./middleware/error-handler");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const expressRateLimit = require("express-rate-limit");

// connectDB
const connectDB = require("./db/connect");

// importing auth middleware to protect all user routes
const authenticateUser = require("./middleware/auth");

//set up static public folder
app.use(express.static("./public"));

//parse html form data
app.use(express.urlencoded({ extended: true }));

// parse JSON data from browser into req.body
app.use(express.json());

// invoking security packages
app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })
);
app.use(helmet());
app.use(cors());

//===Routes and Middleware===
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.use("/auth", authRouter);
// inserting auth middleware before the recipesRouter to proctect user routes
app.use("/recipes", authenticateUser, recipesRouter);

//Catch all 404 middleware (not-found.js)
app.use(notFound);

app.use(errorHandler);
//===Listening to port===

const port = process.env.PORT || 3000;

// for testing

let mongoURL = process.env.MONGO_URI;
if (process.env.NODE_ENV == "test") {
  mongoURL = process.env.MONGO_URI_TEST;
}

const start = async () => {
  try {
    await connectDB(mongoURL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

console.log("CURRENT NODE ENV", process.env.NODE_ENV);
console.log("Using MongoDB URI", mongoURL);

console.log("Recipe app is up");

//  / - public landing page with register and login button
//  /register - public registration
//  /login - public login
//  /recipes - requires authorization for user to access
