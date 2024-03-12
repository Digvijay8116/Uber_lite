//models
const User = require("../models/userModel");
const Driver = require("../models/driverModel");

//register Driver
const driverRegister = async (req, res) => {
  try {
    const { name, lat, lon, vehicleType } = req.body;
    if (!name) {
      res.send({ resp: "enter your name" });
    } else if (!lat) {
      res.send({ resp: "enter latitude first" });
    } else if (!lon) {
      res.send({ resp: "enter longitude first" });
    } else if (!vehicleType) {
      res.send({ resp: "enter vehicle type to" });
    } else {
      let newDriver = new Driver({
        name: name,
        location: {
          coordinates: [lat, lon],
        },
        vehicleType: vehicleType,
      });

      newDriver = await newDriver.save();
      if (newDriver) {
        res.send({ resp: "driver Register success" });
      }
    }
  } catch (error) {
    res.send({ resp: error });
  }
};

//find nearby passenger
const findUser = async (req, res) => {
  const { lat, lon } = req.body;

  try {
    let result = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "point",
            coordinates: [lat, lon],
          },
          $maxDistance: 5000,
        },
      },
    });
    if (result.length > 0) {
      res.send({ resp: result });
    } else {
      res.send({ resp: "NO User found" });
    }
  } catch (error) {
    res.send({ resp: error });
  }
};

module.exports = { driverRegister, findUser };
