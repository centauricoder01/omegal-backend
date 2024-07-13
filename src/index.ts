import { Socket } from "socket.io";
import http from "http";

import express from "express";
import { Server } from "socket.io";
import { UserManager } from "./managers/UserManger";

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

const userManager = new UserManager();

app.get("/", (req, res) => {
  res.send("Yes, This is web socket server");
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  });
});

server.listen({ port: +port, host: "0.0.0.0" }, () => {
  console.log(`listening on ${port}`);
});
