const express = require("express").Router();
const authenticate = require("../../middleware/authenticate");

router.get("/getData", authenticate, async (req, res) => {
  console.log("Hello, this is a homepage");
  res.send(req.rootUser);
});

module.exports = router;
