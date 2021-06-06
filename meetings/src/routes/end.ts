import express, { Request, Response } from "express";
import { baseUrl } from "../config";
import { Meeting } from "../models/model";

const router = express.Router();

router.post(`${baseUrl}/end/:id`, async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user } = req.body;
  try {
    const meeting = await Meeting.findOne({ _id: id, host: user });
    if (!meeting) {
      return res.status(400).send("Meeting is not found");
    }
    meeting.status = "ended";
    await meeting.save();

    //end the meeting twilio

    return res.status(201);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export { router as endMeetingsRouter };
