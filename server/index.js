const app = require("express")();
const server = require("http").createServer(app);

// https://socket.io/docs/v3/handling-cors/
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const port = 5000;

io.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(socket.rooms);
  });

  socket.on("message", ({ roomId, message }) => {
    io.to(roomId).emit("message", `${socket.id} said ${message}`);
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
