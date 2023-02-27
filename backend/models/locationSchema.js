const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("LOCATION", locationSchema);
module.exports = Location;
