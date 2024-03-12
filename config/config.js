const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://Digvijay:Test123@cluster0.hv2anhk.mongodb.net/Uber_?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(err);
  });
