import express from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { baseUrl } from "../config";

dotenv.config();

const router = express.Router();

router.post(`${baseUrl}/verify`, (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  const role = req.body.role;
  if (!token) {
    return res.status(400).send("No Token Provided");
  }

  try {
    let payload: any;
    payload = verify(token, process.env.TOKEN_KEY_SECRET as string);
    if (role && payload.role != role) {
      return res.status(400).send("Role not authorized");
    }
    return res.status(200).send("Verified");
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
});

export { router as verifyRouter };
