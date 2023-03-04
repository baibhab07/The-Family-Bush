const uploadMiddleware = require("../../middleware/multer");
const Gallery = require("../../models/gallerySchema");
// const User = require("../../models/userSchema");

const router = require("express").Router();

router.post("/", uploadMiddleware.single("photo"), async (req, res) => {
  const photo = req.file.filename;
  console.log(photo);
  const newPhoto = new Gallery({
    photo,
  });
  try {
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  // try {
  //   const user = await User.findById(req.userId);
  //   // Get the family Id of the user
  //   const familyId = user.family;
  //   // Find all the users that belong to the given familyId
  //   const users = await User.find({ family: familyId });
  //   // Extract the user IDs from the user documents
  //   const userIds = users.map((user) => user._id);
  //   // Find all the todos that were created by the extracted user IDs
  //   const photos = await Gallery.find({ createdBy: { $in: userIds } }).sort({
  //     createdAt: "descending",
  //   });
  //   res.status(200).json(photos);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Something went wrong" });
  // }
  const photos = await Gallery.find().sort({ createdAt: "descending" });
  res.send(photos);
});

module.exports = router;
