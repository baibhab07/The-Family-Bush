const mongoose = require("mongoose");

const Location = require("../../models/locationSchema");

const getLocation = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addLocation = async (req, res) => {
  const newLocation = new Location(req.body);
  try {
    const savedLocation = await newLocation.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLocation = getLocation;
exports.addLocation = addLocation;
