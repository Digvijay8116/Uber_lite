//models
const User = require("../models/userModel");
const Driver = require("../models/driverModel");

//user register here
const userRegister = async (req, res) => {
  try {
    const { name, lat, lon } = req.body;

    if (!name) {
      res.send({ resp: "enter your name" });
    } else if (!lat) {
      res.send({ resp: "enter latitude" });
    } else if (!lon) {
      res.send({ resp: "enter longitude" });
    } else {
      let newUser = new User({
        name: name,
        location: {
          coordinates: [lat, lon],
        },
      });
      newUser = await newUser.save();

      if (newUser) {
        res.send({ resp: "user register" });
      }
    }
  } catch (error) {
    res.send({ resp: error });
  }
};

//find nearby driver
const findDriver = async (req, res) => {
  const { lat, lon, vehicleType } = req.body;

  try {
    let result = await Driver.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lon],
          },
          $maxDistance: 5000,
        },
      },
      vehicleType: { $regex: new RegExp(vehicleType, "i") },
    });
    if (result.length > 0) {
      res.send({ resp: result });
    } else {
      res.send({ resp: "NO Driver found" });
    }
  } catch (error) {
    res.send({ resp: error });
  }
};

module.exports = { userRegister, findDriver };
