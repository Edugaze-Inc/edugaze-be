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
    default: "incoming",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  sid: {
    type: String,
  },
});

const userMeetingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meetings: [
    {
      type: String,
    },
  ],
});

export { meetingSchema, userMeetingsSchema };
