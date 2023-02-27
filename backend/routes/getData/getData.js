const express = require("express");
const { getData } = require("../../controllers/homepage/getDataController");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.get("/getData", authenticate, getData);
module.exports = router;
