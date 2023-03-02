const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
});

const Todo = mongoose.model("TODO", todoSchema);
module.exports = Todo;
