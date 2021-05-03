import express from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/api/users/verifyUser", (req, res) => {
  const token = req.header("Authentication");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    verify(token, process.env.TOKEN_KEY_SECRET as string);
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }

  return res.status(201).send("Verified");
});

export { router as verifyRouter };
