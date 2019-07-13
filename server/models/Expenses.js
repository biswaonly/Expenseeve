const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
