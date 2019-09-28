const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://lhod38:xH34ZSy9d4ejr2Gn@cluster0-b2g3u.mongodb.net/node-angular?retryWrites=true&w=majority"
,{useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: false}));
// express static allows the request(that contains /images/) to continue and fetch the data
// path.join allows to map the request /images to backend/images
=======
app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> 2bc5ad4d0693df709d5d486ab35fb547302ddad7
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
