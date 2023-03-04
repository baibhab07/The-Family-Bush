const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("GALLERY", gallerySchema);

module.exports = Gallery;
