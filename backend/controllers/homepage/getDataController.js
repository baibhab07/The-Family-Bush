const getData = async (req, res) => {
  console.log("Hello, this is a homepage");
  res.send(req.rootUser);
};

exports.getData = getData;
