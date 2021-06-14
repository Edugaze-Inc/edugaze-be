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
    body("host").not().isEmpty().withMessage("Host is required"),
    body("startTime").not().isEmpty().withMessage("Start Time is required"),
    body("endTime").not().isEmpty().withMessage("End Time is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array({ onlyFirstError: true })[0].msg);
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
      resV = await axios.post(
        "http://auth:3000/api/v1/auth/verify",
        { role: "instructor" },
        config
      );
    } catch (err) {
      return res.status(400).send("User is not authorized");
    }
    if (resV.status == 400) {
      return res.status(400).send("User is not authorized");
    }

    const { title, course, host, startTime, endTime } = req.body;
    const status = "incoming";
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
