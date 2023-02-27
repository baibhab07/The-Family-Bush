const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
});

const Expense = mongoose.model("EXPENSE", messageSchema);
module.exports = Expense;
