const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  categories: {
    type: [String],
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

module.exports = Budget = mongoose.model("budget", BudgetSchema);
