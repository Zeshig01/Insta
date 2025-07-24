const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  caption: {
    type: String,
    required: false
  },
  postimage: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
