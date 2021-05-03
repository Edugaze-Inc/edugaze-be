import mongoose from 'mongoose';

const uri = "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
 return mongoose.connect(uri);
};

export { connectDb };