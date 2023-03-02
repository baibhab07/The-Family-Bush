const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    console.log(req.rootUser);
    req.userId = rootUser._id;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Unauthorized: No token provided");
  }
};

module.exports = authenticate;
