const express = require("express");
const {
  joinFamily,
} = require("../../controllers/authenticationController/joinFamilyController");

const router = express.Router();

router.post("/joinFamily", joinFamily);
module.exports = router;
