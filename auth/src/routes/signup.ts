import express from "express";
import { User, makeUser } from "../models/user";
import { createAccessToken } from "../utils/authToken";

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  // TODO validation with Joi
  const { email, password } = req.body;

  // see if a user exists
  if (await User.findOne({ email })) {
    return res.send("Account Already exists!");
  }

  // making a new user and saving them into the database
  const newUser = await makeUser({ email, password });
  await newUser.save();

  // consider user signed in
  const userJWT = createAccessToken({ email });
  res.cookie("jwt-token", userJWT);
  return res.status(201).send(newUser);
});

export { router as signupRouter };
