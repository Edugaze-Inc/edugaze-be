import express, { Request, Response } from "express";
import { Meeting, UserMeetings } from "../models/model";

import { baseUrl } from "../config";

const router = express.Router();

router.get(`${baseUrl}/listhost`, async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const meetings = await Meeting.findOne({ host: email });

    if (!meetings) {
      return res.status(400).send("No meetings found");
    }

    return res.status(201);
  } catch (error) {
    return res.status(400);
  }
});

router.get(`${baseUrl}/liststudent`, async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await UserMeetings.findOne({ host: email });

    const userMeetingsIds = user?.meetings;
    const userMeetings = Meeting.find({ _id: { $in: userMeetingsIds } });

    return res.status(201).send(userMeetings);
  } catch (error) {
    return res.status(400);
  }
});

export { router as listMeetingsRouter };
