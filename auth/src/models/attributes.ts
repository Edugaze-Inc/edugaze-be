import mongoose from "mongoose";

//An interface to describe the types of a user attributes
interface userAttributes {
  email: string;
  password: string;
}

// An interface that keeps tracksof any values added by mongo
interface userDocument extends mongoose.Document {
  email: string;
  password: string;
}

export { userAttributes, userDocument };
