import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { Meeting } from "../models/model";
import { createTwilioToken } from "../utils/twilioToken";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

router.post(`${baseUrl}/start/:id`, async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user } = req.body;
  try {
    const meeting = await Meeting.findOne({ _id: id, host: user });
    if (!meeting) {
      return res.status(400).send("Meeting is not found");
    }

    meeting.status = "current";
    await meeting.save();

    //create a room in twilio and return an access token
    const roomName = meeting._id;
    client.video.rooms
      .create({
        type: "group",
        uniqueName: roomName,
      })
      .then((room: { sid: any }) => console.log(room.sid));

    const token = createTwilioToken(user, roomName);
    return res.status(201).send(token);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as startMeetingsRouter };
