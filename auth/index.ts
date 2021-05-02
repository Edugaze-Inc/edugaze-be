import express from "express";

import { signupRouter } from './src/routes/signup';
import { signinRouter } from './src/routes/signin';
import { signoutRouter } from './src/routes/signout';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

const port = 3000;
app.get("/", (req, res) => {
  res.send("<h1>Hello Edugaze!!</h1>");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
