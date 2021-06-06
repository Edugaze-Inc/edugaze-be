import express, { Request, Response } from "express";
import { Meeting, UserMeetings } from "../models/model";

import { baseUrl } from "../config";

const router = express.Router();

router.get(`${baseUrl}/listhost`, async (req: Request, res: Response) => {
  const { user } = req.body;
  const status = req.query.status;

  let meetings;

  try {
    if (status == "ended" || status == "incoming") {
      meetings = await Meeting.findOne({ host: user, status: status });
    } else {
      meetings = await Meeting.findOne({ host: user });
    }

    if (!meetings) {
      return res.status(201).send("No meetings found");
    }

    return res.status(201).send(meetings);
  } catch (error) {
    return res.status(400);
  }
});

router.get(`${baseUrl}/liststudent`, async (req: Request, res: Response) => {
  const { user } = req.body;
  const status = req.query.status;

  let userMeetings;

  try {
    const userMeeting = await UserMeetings.findOne({ name: user });
    const userMeetingsIds = userMeeting?.meetings;

    if (status === "ended" || status === "incoming") {
      userMeetings = await Meeting.find({
        _id: { $in: userMeetingsIds },
        status: status,
      });
    } else {
      userMeetings = await Meeting.find({ _id: { $in: userMeetingsIds } });
    }

    return res.status(201).send(userMeetings);
  } catch (error) {
    return res.status(400);
  }
});

export { router as listMeetingsRouter };
