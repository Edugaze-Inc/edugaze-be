import mongoose from "mongoose";

// An interface to describe the types of a meeting attributes
interface MeetingAttributes {
  title: string;
  course: string;
  host: string;
  status: string;
  startTime: Date;
  endTime: Date;
}

// An interface that keeps tracks of any values added by mongo to the meeting schema
interface MeetingDocument extends mongoose.Document {
  title: string;
  course: string;
  host: string;
  status: string;
  startTime: Date;
  endTime: Date;
}

// An interface to describe the types of a userMeetings attributes
interface UserMeetingsAttributes {
  name: string;
  meetings: String[];
}

// An interface that keeps tracks of any values added by mongo to the userMeetings collection
interface UserMeetingsDocument extends mongoose.Document {
  name: string;
  meetings: string[];
}

export {
  MeetingAttributes,
  MeetingDocument,
  UserMeetingsAttributes,
  UserMeetingsDocument,
};
