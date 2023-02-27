const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  title: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Gallery = mongoose.model("GALLERY", gallerySchema);

module.exports = Gallery;
