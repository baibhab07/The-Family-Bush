const express = require("express");
const {
  createFamily,
} = require("../../controllers/authenticationController/createFamilyController");

const router = express.Router();

router.post("/createFamily", createFamily);
module.exports = router;
