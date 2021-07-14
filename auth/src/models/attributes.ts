import mongoose from "mongoose";

// An interface to describe the types of a user attributes
interface UserAttributes {
  username: string;
  email: string;
  password: string;
  role: string;
}

// An interface that keeps tracks of any values added by mongo
interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

export { UserAttributes, UserDocument };
