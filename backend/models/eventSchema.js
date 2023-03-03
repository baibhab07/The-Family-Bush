const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
    min: [new Date(), "Date can't be earlier than now"],
  },
  end: {
    type: Date,
    //setting a min function to accept any date one hour ahead of start
    min: [
      function () {
        const date = new Date(this.start);
        const validDate = new Date(date.setHours(date.getHours() + 1));
        return validDate;
      },
      "Event end must be at least one hour ahead of event time",
    ],
    default: function () {
      const date = new Date(this.start);
      return date.setDate(date.getDate() + 1);
    },
  },
  describe: { type: String },
});

const Events = mongoose.model("EVENTS", eventSchema);
module.exports = Events;
