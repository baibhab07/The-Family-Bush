require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const createFamilyRoute = require("./routes/authentication/createFamily");
const joinFamilyRoute = require("./routes/authentication/joinFamily");
const loginRoute = require("./routes/authentication/login");
const getDataRoute = require("./routes/getData/getData");
const todoRoutes = require("./routes/todo/todo");
const locationRoute = require("./routes/location/location");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use(cookieParser());

//linking router files
app.use("/createFamily", createFamilyRoute);
app.use("/joinFamily", joinFamilyRoute);
app.use("/login", loginRoute);
app.use("/getData", getDataRoute);
app.get("/todos", todoRoutes);
app.get("/location-all", locationRoute);

//database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database successfully.");
    //listen to port
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
