const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
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

const Message = mongoose.model("MESSAGE", messageSchema);
module.exports = Message;
