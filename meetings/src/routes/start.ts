import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { Meeting } from "../models/model";
import { createTwilioToken } from "../utils/twilioToken";
import axios from "axios";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

router.post(`${baseUrl}/start/:id`, async (req: Request, res: Response) => {
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
  const user = resV.data._id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Meeting is not found");
  }
  try {
    const meeting = await Meeting.findOne({ _id: id, host: user });
    if (!meeting) {
      return res.status(400).send("Meeting is not found");
    }

    meeting.status = "current";

    //create a room in twilio and return an access token
    const roomName = meeting.title + "-" + meeting.course;
    client.video.rooms
      .create({
        type: "group",
        uniqueName: roomName,
      })
      .then(async (room: { sid: any }) => {
        meeting.sid = room.sid;
        await meeting.save();
      });

    const token = createTwilioToken(user, roomName);

    return res.status(201).send(token);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as startMeetingsRouter };
