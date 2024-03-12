//express app setup
const express = require("express");
const app = express();
const PORT = 9001;
//require mongo
require("./config/config");
const path = require("path");

//socket server setup
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

//get data from the body
app.use(express.json());

//send static file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Routes
const user_route = require("./routes/userRoute");
const driver_route = require("./routes/driverRoute");
app.use("/", user_route);
app.use("/", driver_route);

//socket start
io.on("connection", (socket) => {
  console.log(`A user connected SOCKETID IS ${socket.id}`);
  io.to(socket.id).emit("socketID", socket.id);

  socket.on("findDriver", (userData) => {
    console.log("findDriver data ===========>>>>>>", userData);
    socket.broadcast.emit("acceptRide", userData);
  });

  socket.on("rideStatus", (rideDetail) => {
    console.log("rideStatus =========> ", rideDetail);
    // socket.broadcast.emit("driverStatus", rideDetail);

    //IT just check whether driver accepted the ride or not
    socket.to(rideDetail.userSOCKETID).emit("driverStatus", rideDetail);
  });

  socket.on("chatData", (rideDetail) => {
    console.log("chatData =======> ", rideDetail);
    console.log("userSOCKETID =======> ", rideDetail.userSOCKETID);
    console.log("driverSOCKETID =======> ", rideDetail.driverSOCKETID);
    // io.emit("chatStart", rideDetail);
    // io se message khud ko bhe bhejna hai take ui me dikhe dono side me
    // do not use socket here tab khud ko emit nahi hoga msg
    io.to(rideDetail.userSOCKETID).emit("chatStart", rideDetail);
    io.to(rideDetail.driverSOCKETID).emit("chatStart", rideDetail);
  });

  socket.on("messageSend", (messageData) => {
    console.log("messageSend =======>", messageData);
    console.log("messageSend  userSOCKETID=======>", messageData.userSOCKETID);
    console.log(
      "messageSend  driverSOCKETID=====>",
      messageData.driverSOCKETID
    );
    // socket.broadcast.emit("messagesReceived", messageData);
    socket.to(messageData.userSOCKETID).emit("messagesReceived", messageData);
    socket.to(messageData.driverSOCKETID).emit("messagesReceived", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected socketID IS ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`server is on at the port number ${PORT} `);
});

// lat: 28.561959251384163
// long: 77.28273070153669
