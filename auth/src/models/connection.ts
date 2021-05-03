import mongoose from "mongoose";

const uri = "mongodb://mongo:27017/auth-test";

const connectDb = () => {
  return mongoose.connect(uri);
};

export { connectDb };
