const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  socket.on("room_entered", async ({ username, roomId }) => {
    socket.roomId = roomId;
    socket.join(roomId);
    socket.username = username;
    console.log(`${socket.username} joined room ${roomId}`);

    try {
      const sockets = await io.in(roomId).fetchSockets();
      console.log("In a room full of", sockets.length, "users");
    } catch (error) {
      console.error("Error fetching sockets in room:", error);
    }

  });
   socket.on("message", (data) => {
    console.log("message received:",data ,"from ",socket.username );
    io.to(socket.roomId).emit("new_message", {
      message: data,
      sender: socket.username,
    });
  });
});


app.get("/", (req, res) => {
  res.send("Hello, World!\n");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
