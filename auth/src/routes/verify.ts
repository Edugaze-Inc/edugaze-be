import express from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { baseUrl } from "../config";

dotenv.config();

const router = express.Router();

router.post(`${baseUrl}/verify`, (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No Token Provided");
  }

  try {
    verify(token, process.env.TOKEN_KEY_SECRET as string);
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }

  return res.status(200).send("Verified");
});

export { router as verifyRouter };
