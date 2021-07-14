import express from "express";
import cookieParser from "cookie-parser";
const cors = require("cors");

import { signupRouter } from "./src/routes/signup";
import { loginRouter } from "./src/routes/login";
import { verifyRouter } from "./src/routes/verify";
import { connectDb } from "./src/models/connection";

const app = express();
connectDb().then(() => {
  // eslint-disable-next-line no-console
  console.log("MongoDb connected!!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use(signupRouter);
app.use(loginRouter);

app.use(verifyRouter);

const port = 4002;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth app listening at http://localhost:${port}`);
});
