import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 4004;
const server = app.listen(port, () => {
  console.log("listening for requests on port 4004,");
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
var emotions: { [k: string]: { [k: string]: string } } = {};
var instructors: { [k: string]: { [k: string]: number } } = {};

io.on("connection", (socket: any) => {
  socket.username = "placeholder";
  console.log("a user connected");
  socket.on("join", function (data: { sid: string }) {
    var meeting = data.sid.split("-")[0];
    var student = data.sid.split("-")[1];
    socket.username = data.sid;

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

    io.to(meeting).emit("emotion update", JSON.stringify(instructors[meeting]));
  });

  socket.on("disconnect", () => {
    var meeting = socket.username.split("-")[0];
    var student = socket.username.split("-")[1];
    if (student) {
      var emotion = emotions[meeting][student];
      instructors[meeting][emotion]--;
      delete emotions[meeting][student];
    }
    io.to(meeting).emit("emotion update", JSON.stringify(instructors[meeting]));
  });
});
