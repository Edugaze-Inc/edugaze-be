import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 4004;
const server = app.listen(port, () => {
  console.log("listening for requests on port 4004,");
});
var socket = require("socket.io");
let io = socket(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var emotions: { [k: string]: { [k: string]: number } } = {};

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("join", function (data: { sid: string }) {
    socket.join(data.sid);
    if (!(data.sid in emotions)) {
      emotions[data.sid] = {
        angry: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
        out: 0,
      };
    }
    emotions[data.sid]["out"]++;
  });

  socket.on("chat message", (data: { msg: string; id: string }) => {
    var prev = data.msg.split("-")[0];
    var curr = data.msg.split("-")[1];
    emotions[data.id][prev]--;
    emotions[data.id][curr]++;
    console.log(emotions[data.id]);

    io.to(data.id + "-i").emit(
      "chat message",
      JSON.stringify(emotions[data.id])
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
