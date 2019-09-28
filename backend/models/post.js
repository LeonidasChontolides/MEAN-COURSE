const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
<<<<<<< HEAD
  title: { type: String, required: true},
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
=======
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
>>>>>>> 2bc5ad4d0693df709d5d486ab35fb547302ddad7
});

module.exports = mongoose.model("Post", postSchema);
