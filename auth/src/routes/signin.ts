import express from "express";
import { User } from "../models/user";
import { PasswordHasher } from "../utils/passHash";
import { createAccessToken } from "../utils/authToken";

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email is not found");
  }

  const passValid = await PasswordHasher.compare(user.password, password);
  if (!passValid) {
    return res.status(400).send("Password is not correct");
  }

  const userJWT = createAccessToken({ email });

  res.header("auth-token", userJWT);
  res.status(201).send("Logged in");
});

export { router as signinRouter };
