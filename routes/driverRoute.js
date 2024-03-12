const express = require("express")
const driver_route = express()
const driverController = require("../controller/driverController")

driver_route.post("/driverRegister",driverController.driverRegister);
driver_route.put("/findUser", driverController.findUser);


module.exports = driver_route