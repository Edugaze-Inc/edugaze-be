import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { Meeting } from "../models/model";
import axios from "axios";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

router.post(`${baseUrl}/end/:id`, async (req: Request, res: Response) => {
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

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Meeting is not found");
  }

  try {
    const meeting = await Meeting.findOne({ _id: id, host: user });
    if (!meeting) {
      return res.status(400).send("Meeting is not found");
    }
    meeting.status = "ended";
    await meeting.save();

    //end the meeting twilio
    client.video
      .rooms(meeting.sid)
      .update({ status: "completed" })
      .then((room: { uniquename: any }) => {
        return res.status(201).send("Meeting ended sccessfully");
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as endMeetingsRouter };
