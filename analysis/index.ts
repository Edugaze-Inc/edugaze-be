import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 80;
const server = app.listen(port, () => {
  console.log("listening for requests on port 80,");
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
  socket.on("join", function (data: { meeting: string; username: string }) {
    var meeting = data.meeting;
    var student = data.username;

    if (student) {
      socket.join(data.meeting + data.username);
    }
    socket.join(data.meeting);
    socket.meeting = data.meeting;
    socket.username = data.username;

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
    if (!(meeting in emotions)) {
      emotions[meeting] = {};
    }

    if (student && !emotions[meeting][student]) {
      instructors[meeting]["out"]++;
      emotions[meeting][student] = "out";
    }
  });

  socket.on(
    "emotion update",
    (data: { msg: string; meeting: string; username: string }) => {
      var meeting = data.meeting;
      var student = data.username;

      var prev = emotions[meeting][student];
      var cur = data.msg;

      instructors[meeting][prev]--;
      instructors[meeting][cur]++;

      emotions[meeting][student] = data.msg;
      console.log(emotions[meeting]);

      io.to(meeting).emit(
        "emotion update",
        JSON.stringify(instructors[meeting])
      );
    }
  );

  socket.on("disconnect", () => {
    var meeting = socket.meeting;
    var student = socket.username;
    if (student) {
      var emotion = emotions[meeting][student];
      instructors[meeting][emotion]--;
      delete emotions[meeting][student];
    }
    io.to(meeting).emit("emotion update", JSON.stringify(instructors[meeting]));
  });
});
