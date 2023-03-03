const User = require("../../models/userSchema");
const Family = require("../../models/familySchema");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//CREATE FAMILY
router.post("/createFamily", async (req, res) => {
  const { name, email, password, confirmPassword, familyName } = req.body;
  if (!name || !email || !password || !confirmPassword || !familyName) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ error: "User with provided email already exists" });
    } else if (password != confirmPassword) {
      return res.status(422).json({ error: "Entered passwords do not match" });
    } else {
      // Saving Family Details
      const newFamily = await Family.create({ familyName });
      // Hashing Password
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
      // Saving User Details
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        family: newFamily._id,
      });
      // Token generation
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET_KEY
      );
      //Update user document with a token
      newUser.token = token;
      await newUser.save();
      //respond with success message
      res.status(201).json({
        message: "User and family created.",
        user: newUser,
        token: token,
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ error: err.message });
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(422).json({ error: "User already exists" });
    }
    // catch all other errors
    res.status(500).json({ message: "Error creating family and user." });
  }
});

//JOIN FAMILY
router.post("/joinFamily", async (req, res) => {
  const { name, email, password, confirmPassword, familyId } = req.body;
  if (!name || !email || !password || !confirmPassword || !familyId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    // check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(500)
        .json({ error: "User with provided email does already exists" });
    }
    // check if the passwords match
    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }
    // check if the family exists
    const checkFamily = await Family.findOne({ _id: familyId });
    if (!checkFamily) {
      return res.status(404).json({ error: "Family not found" });
    }
    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    // create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      family: familyId,
    });

    // Token generation
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY
    );
    // Update user document with token
    newUser.token = token;
    await newUser.save();
    res.status(201).json({
      message: "User created and joined to a family.",
      user: newUser,
      token: token,
    });
  } catch (err) {
    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(422).json({ error: err.message });
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(422).json({ error: "User already exists" });
    }
    // catch all other errors
    res.status(500).json({ message: "Error joining a family" });
  }
});

module.exports = router;
