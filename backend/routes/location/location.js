const router = require("express").Router();
const authenticate = require("../../middleware/authenticate");
const Location = require("../../models/locationSchema");
const User = require("../../models/userSchema");

router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // Get the family Id of the user
    const familyId = user.family;
    // Find all the users that belong to the given familyId
    const users = await User.find({ family: familyId });
    // Extract the user IDs from the user documents
    const userIds = users.map((user) => user._id);
    const locations = await Location.find({ createdBy: { $in: userIds } });
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", authenticate, async (req, res) => {
  const newLocation = new Location({
    address,
    createdBy: req.userId,
    lat,
    long,
  });
  try {
    const savedLocation = await newLocation.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
