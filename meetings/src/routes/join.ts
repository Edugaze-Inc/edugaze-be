import express, { Request, Response } from "express";
import { createTwilioToken } from "../utils/twilioToken";
import { baseUrl } from "../config";
import { UserMeetings, Meeting } from "../models/model";
import axios from "axios";

const router = express.Router();

router.post(`${baseUrl}/join/:id`, async (req: Request, res: Response) => {
  const id = req.params.id;

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

  const user = resV.data._id;
  const identity = resV.data.username;

  try {
    let userMeetings = await UserMeetings.findOne({ name: user });

    if (userMeetings) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send("Meeting is not found");
      }

      //checking if the meeting exist
      const meeting = await Meeting.findOne({ _id: id });
      if (!meeting) {
        return res.status(400).send("Meeting is not found");
      }

      //check if the meeting is already in the user meetings
      if (!userMeetings.meetings.includes(id)) {
        res.status(400).send("You're not a part of this meeting");
      }

      if (meeting.status === "current") {
        const roomName = meeting.title + "-" + meeting.course;
        const token = createTwilioToken(identity, roomName);
        return res.status(201).send(token);
      }

      return res.status(400).send("Meeting hasn't started yet");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as joinMeetingsRouter };
