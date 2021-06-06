import express, { Request, Response } from "express";

import { baseUrl } from "../config";
import { UserMeetings, newUserMeetings, Meeting } from "../models/model";

const router = express.Router();

router.post(`${baseUrl}/join/:id`, async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user } = req.body;
  try {
    // checking if the user have meetings and creating a new entry if not
    let userMeetings = await UserMeetings.findOne({ name: user });
    if (!userMeetings) {
      userMeetings = await newUserMeetings({
        name: user,
        meetings: [],
      });
    }

    //checking if the meeting exist
    if (!(await Meeting.findOne({ _id: id }))) {
      return res.status(400).send("The meeting doesn't exist");
    }
    userMeetings.meetings.push(id);
    await userMeetings.save();

    return res.status(201).send(userMeetings);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as joinMeetingsRouter };
