import mongoose from "mongoose";

// An interface to describe the types of a user attributes
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that keeps tracks of any values added by mongo
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

export { UserAttributes, UserDocument };
