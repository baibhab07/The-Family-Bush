const express = require("express");
const app = express();
const mongoose = require("mongoose");

const familyRoute = require("./routes/family/family");
const loginRoute = require("./routes/authentication/login");
const locationRoute = require("./routes/location/location");
const todoRoute = require("./routes/todo/todo");
const getDataRoute = require("./routes/getData/getData");

//middleware
require("dotenv").config();
app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + " , URL - " + req.url);
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

//linking router files
app.use("/api/getData", getDataRoute);
app.use("/api/families", familyRoute);
app.use("/api/login", loginRoute);
app.use("/api/locations", locationRoute);
app.use("/api/todos", todoRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
