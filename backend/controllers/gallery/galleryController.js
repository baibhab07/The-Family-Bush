const moongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const gallerySchema = require("../../models/gallerySchema");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, res, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const postImage = async (req, res) => {
  const saveImage = gallerySchema({
    title: req.body.title,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("Image is saved");
    })
    .catch((err) => {
      console.log(err, "Error has occured");
    });
  res.send("Image is saved");
};

const getImage = async (req, res) => {
  const allData = await imageModel.find();
  res.json(allData);
};
