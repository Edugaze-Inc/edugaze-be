import express from "express";
import cookieParser from "cookie-parser";

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

app.use(signupRouter);
app.use(loginRouter);
app.use(verifyRouter);

const port = 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
