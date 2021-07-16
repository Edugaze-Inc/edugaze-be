import express from "express";
import cookieParser from "cookie-parser";
const cors = require("cors");

import { connectDb } from "./src/models/connection";

import { newMeetingsRouter } from "./src/routes/new";
import { listMeetingsRouter } from "./src/routes/list";
import { startMeetingsRouter } from "./src/routes/start";
import { joinMeetingsRouter } from "./src/routes/join";
import { endMeetingsRouter } from "./src/routes/end";
import { subscribeMeetingsRouter } from "./src/routes/subscribe";

const app = express();
connectDb().then(() => {
  // eslint-disable-next-line no-console
  console.log("MongoDb connected!!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

app.use(newMeetingsRouter);
app.use(listMeetingsRouter);
app.use(startMeetingsRouter);
app.use(joinMeetingsRouter);
app.use(endMeetingsRouter);
app.use(subscribeMeetingsRouter);

const port = 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Meetings servcie listening at http://localhost:${port}`);
});
