import express, { Request, Response } from "express";
import { createTwilioToken } from "../utils/twilioToken";
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
    const meeting = await Meeting.findOne({ _id: id });
    if (!meeting) {
      return res.status(400).send("The meeting doesn't exist");
    }

    //check if the meeting is already in the user meetings
    if (!(id in userMeetings.meetings)) {
      userMeetings.meetings.push(id);
    }

    await userMeetings.save();

    //if meeting in progress, generate token

    if (meeting.status == "current") {
      const uniqueName = meeting._id;
      const token = createTwilioToken(user, uniqueName);
      return res.status(201).send(token);
    }

    return res.status(201);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as joinMeetingsRouter };
