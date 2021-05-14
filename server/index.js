const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const port = 5000;

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", `${socket.id} said ${message}`);
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
