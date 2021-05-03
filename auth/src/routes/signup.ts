import express from "express";
import { body, validationResult } from "express-validator";
import { User, makeUser } from "../models/user";
import { createAccessToken } from "../utils/authToken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email not Valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Password must be between 4 and 16 characters"),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send("Invalid Email or Password!");
    }

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

    res.setHeader("Authentication", `bearer ${userJWT}`);
    return res.status(201).send(newUser);
  }
);

export { router as signupRouter };
