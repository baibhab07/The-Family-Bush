const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("TODO", todoSchema);
module.exports = Todo;
