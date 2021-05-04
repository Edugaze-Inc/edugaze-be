import express from "express";
import cookieParser from "cookie-parser";

import { signupRouter } from "./src/routes/signup";
import { signinRouter } from "./src/routes/signin";
import { verifyRouter } from "./src/routes/verify";
import { connectDb } from "./src/models/connection";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(signupRouter);
app.use(signinRouter);
app.use(verifyRouter);

const port = 3000;
app.get("/", async (req, res) => {
  res.send("<h1>HIIII Edugaze!!</h1>");
  connectDb().then(() => {
    console.log("MongoDb connected!!");
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
