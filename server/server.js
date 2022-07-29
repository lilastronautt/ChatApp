const io = require("socket.io")(3001, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recieve-message", data);
  });
});
