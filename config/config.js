const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/Uber_";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(err);
  });
