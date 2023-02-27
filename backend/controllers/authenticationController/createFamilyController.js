const mongoose = require("mongoose");
const User = require("../../models/userSchema");
const Family = require("../../models/familySchema");

const createFamily = async (req, res) => {
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
      const newFamily = new Family({ familyName });
      const newUser = new User({
        name,
        email,
        password,
        confirmPassword,
        family: newFamily._id,
      });
      await newFamily.save();
      // bcrypting done here
      await newUser.save();
      //respond with success message
      res
        .status(201)
        .json({ message: "Family and user created successfully." });
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
};

exports.createFamily = createFamily;
