import mongoose from "mongoose";

const uri = "mongodb://mongo-mongo:27017/meetings-test";

const connectDb = () => mongoose.connect(uri);

export { connectDb };
