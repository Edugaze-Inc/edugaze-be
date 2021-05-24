import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  host: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "upcoming",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const userMeetingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingDocument",
    },
  ],
});

export { meetingSchema, userMeetingsSchema };
