const express = require("express");
const user_route = express();
const userController = require("../controller/userController");

user_route.post("/userRegister", userController.userRegister);
user_route.put("/findDriver", userController.findDriver);
module.exports = user_route;
