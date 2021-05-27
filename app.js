//express
const express = require("express");
const app = express();
const path = require("path");   //path
require("dotenv").config({ path: ".env" });   //dotenv

// express json Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", require("./api_routes"));   // API Routes
app.use("/public", express.static(path.join(__dirname, "public")));   // Serve Public static files

// main route
app.get("*", (req, res) => {
  res.send(
    ' <h1> <a href="http://localhost:9002/api/google-login">Users Credentials to login </a> </h1>'
  );
});

//error handeller
app.use((req, res, next) => {
  const error = new Error("Path Not found please read the docs");
  error.status = 404;
  next(error);
});

// error handeller
app.use((error, req, res, next) => {
  console.log("[ERROR HANDELLER]\t" + error);
  res.status(error.status || 500).json({
    error: {
      massage: error.message,
    },
  });
});

module.exports = app;
