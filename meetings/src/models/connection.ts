import mongoose from "mongoose";

const uri = "mongodb://auth-mongo:27017/meetings-test";

const connectDb = () => mongoose.connect(uri);

export { connectDb };
