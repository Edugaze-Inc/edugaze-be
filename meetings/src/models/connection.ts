import mongoose from "mongoose";

const uri = "mongodb://meetings-db-service:27017/meetings-test";

const connectDb = () => mongoose.connect(uri);
export { connectDb };
