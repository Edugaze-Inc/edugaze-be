import mongoose from "mongoose";
import {
  MeetingDocument,
  UserMeetingsDocument,
  MeetingAttributes,
  UserMeetingsAttributes,
} from "./interfaces";
import { meetingSchema, userMeetingsSchema } from "./schema";

const Meeting = mongoose.model<MeetingDocument>("Meeting", meetingSchema);
const UserMeetings = mongoose.model<UserMeetingsDocument>(
  "UserMeetings",
  userMeetingsSchema
);

// newmeetings enforces attributes types before creating a new document
const newMeeting = async (attributes: MeetingAttributes) => {
  return new Meeting(attributes);
};

// newmuserMeetings enforces types before creating a new document
const newUserMeetings = async (attributes: UserMeetingsAttributes) => {
  return new UserMeetings(attributes);
};

export { Meeting, UserMeetings, newMeeting, newUserMeetings };
