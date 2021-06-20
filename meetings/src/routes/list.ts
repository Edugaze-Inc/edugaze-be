import express, { Request, Response } from "express";
import { Meeting, UserMeetings } from "../models/model";

import { baseUrl } from "../config";
import axios from "axios";

const router = express.Router();

router.get(`${baseUrl}/listhost`, async (req: Request, res: Response) => {
  const status = req.query.status;

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

  let meetings;

  try {
    if (status == "ended" || status == "incoming") {
      meetings = await Meeting.find({ host: user, status: status });
    } else {
      meetings = await Meeting.find({ host: user });
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
  const status = req.query.status;

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
      { role: "student" },
      config
    );
  } catch (err) {
    return res.status(400).send("User is not authorized");
  }
  if (resV.status == 400) {
    return res.status(400).send("User is not authorized");
  }

  const user = resV.data._id;

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
