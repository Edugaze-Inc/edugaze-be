import express from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/api/users/verifyUser", (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No Token Provided");
  }

  try {
    verify(token, process.env.TOKEN_KEY_SECRET as string);
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }

  return res.status(201).send("Verified");
});

export { router as verifyRouter };
