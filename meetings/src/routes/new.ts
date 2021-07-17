import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { body, validationResult } from "express-validator";
import { newMeeting } from "../models/model";
import axios from "axios";

const router = express.Router();

router.post(
  `${baseUrl}/new`,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("startTime").not().isEmpty().withMessage("Start Time is required"),
    body("endTime").not().isEmpty().withMessage("End Time is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send(errors.array({ onlyFirstError: true })[0].msg);
    }

    let resV;
    //validating the user's token
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      resV = await axios.get(
        "http://auth-service:4002/api/v1/auth/verify",
        config
      );
    } catch (err) {
      return res.status(400).send("User is not authorized");
    }
    if (resV.status == 400) {
      return res.status(400).send("User is not authorized");
    }

    const role = resV.data.role;

    if (role != "instructor") {
      return res.status(400).send("Only instructors can create meetings!");
    }

    const { title, course, startTime, endTime } = req.body;
    const status = "incoming";
    const host = resV.data._id;
    const sid = "";
    try {
      // making a new meeting and saving it into the database
      const meeting = await newMeeting({
        title,
        course,
        status,
        host,
        startTime,
        endTime,
        sid,
      });
      await meeting.save();

      return res.status(201).send(meeting);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
);

export { router as newMeetingsRouter };
