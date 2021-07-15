import express from "express";
import { User } from "../models/user";
import { PasswordHasher } from "../utils/passHash";
import { createAccessToken } from "../utils/authToken";
import { baseUrl } from "../config";

const router = express.Router();

router.post(`${baseUrl}/login`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Email is not found");
    }
    const passValid = await PasswordHasher.compare(user.password, password);
    if (!passValid) {
      return res.status(400).send("Password is not correct");
    }
    const { role, username } = user;

    const userJWT = createAccessToken({ username, email, role });

    return res
      .status(201)
      .send({ token: userJWT, username: username, email: email, role: role });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as loginRouter };
