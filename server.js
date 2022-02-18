const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
const PORT = process.env.PORT || 7000;

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/app/index.html");
});

http.listen(PORT, function() {
  console.log("Your app is listening on port " + http.address().port);
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("welcome", function(data){
      io.emit("welcome", data);
  });
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", function() {
    console.log("a user disconnected");
  });
});
