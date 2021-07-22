import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { UserMeetings, newUserMeetings, Meeting } from "../models/model";
import axios from "axios";

const router = express.Router();

router.post(`${baseUrl}/subscribe/:id`, async (req: Request, res: Response) => {
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
    resV = await axios.get("http://auth-service/v1/verify", config);
  } catch (err) {
    return res.status(400).send("User is not authorized");
  }
  if (resV.status == 400) {
    return res.status(400).send("User is not authorized");
  }

  const user = resV.data._id;

  try {
    // checking if the user have meetings and creating a new entry if not
    let userMeetings = await UserMeetings.findOne({ name: user });
    if (!userMeetings) {
      userMeetings = await newUserMeetings({
        name: user,
        meetings: [],
      });
    }

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
      userMeetings.meetings.push(id);
    }

    userMeetings
      .save()
      .then((doc) => {})
      .catch((err) => {
        res.status(400).send(err);
      });

    return res.status(201).send(meeting);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as subscribeMeetingsRouter };
