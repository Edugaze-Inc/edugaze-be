import express from "express";

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("<h1>Hello Edugaze!!</h1>");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
