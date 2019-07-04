const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
