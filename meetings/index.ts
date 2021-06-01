import express from "express";
import cookieParser from "cookie-parser";

import { connectDb } from "./src/models/connection";

import { newMeetingsRouter } from "./src/routes/new";
import { listMeetingsRouter } from "./src/routes/list";

const app = express();
connectDb().then(() => {
  // eslint-disable-next-line no-console
  console.log("MongoDb connected!!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(newMeetingsRouter);
app.use(listMeetingsRouter);

const port = 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
