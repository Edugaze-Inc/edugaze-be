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

app.get("/", (req, res) => {});

var emotions: { [k: string]: { [k: string]: string } } = {};
var instructors: { [k: string]: { [k: string]: number } } = {};

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("join", function (data: { sid: string }) {
    var meeting = data.sid.split("-")[0];
    var student = data.sid.split("-")[1];

    socket.join(data.sid);
    if (!(meeting in instructors)) {
      instructors[meeting] = {
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
    if (student) {
      instructors[meeting]["out"]++;
    }

    if (!(meeting in emotions)) {
      emotions[meeting] = {};
    }
    emotions[meeting][student] = "out";
  });

  socket.on("emotion update", (data: { msg: string; id: string }) => {
    var meeting = data.id.split("-")[0];
    var student = data.id.split("-")[1];

    var prev = emotions[meeting][student];
    var cur = data.msg;

    instructors[meeting][prev]--;
    instructors[meeting][cur]++;

    emotions[meeting][student] = data.msg;

    io.to(meeting).emit("chat message", JSON.stringify(instructors[meeting]));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
