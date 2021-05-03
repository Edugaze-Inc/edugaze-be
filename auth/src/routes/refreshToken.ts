import express from "express";

const router = express.Router();

router.post("/api/users/refreshToken", (req, res) => {
  console.log(req.cookies);

  //verify user from token send as cookie, find user info and create a new token
});

export { router as refreshToken };
