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
    body("role")
      .trim()
      .isLength({ min: 1, max: 1 })
      .withMessage("No role provided"),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send("Invalid or Incomplete Data!");
    }

    const { email, password, role } = req.body;

    try {
      // see if the user exists
      if (await User.findOne({ email })) {
        return res.send("Account Already exists!");
      }

      // making a new user and saving them into the database
      const newUser = await makeUser({ email, password, role });
      await newUser.save();

      // consider user signed in
      const userJWT = createAccessToken({ email, role });

      return res.status(201).send({ token: userJWT });
    } catch (error) {
      return res.status(400).send("database connection failed");
    }
  }
);

export { router as signupRouter };
