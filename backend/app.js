const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");


const app = express();
mongoose.connect("mongodb+srv://lhod38:xH34ZSy9d4ejr2Gn@cluster0-b2g3u.mongodb.net/node-angular?retryWrites=true&w=majority"
,{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
console.log('Connected to Database!');
})
.catch(() => {
console.log('Connection failed!');
});


app.use(bodyParser.json());


app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
