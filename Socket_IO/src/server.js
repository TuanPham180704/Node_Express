const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  socket.on("chat message", (msg) => {
    console.log("Message :", msg);
    io.emit("chat message : ", msg);
  });
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnect`);
  });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
