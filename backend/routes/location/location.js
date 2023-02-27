const express = require("express");

const {
  getLocation,
  addLocation,
} = require("../../controllers/location/locationController");

const router = express.Router();

router.get("/location-all", getLocation);
router.post("/location/new", addLocation);

module.exports = router;
