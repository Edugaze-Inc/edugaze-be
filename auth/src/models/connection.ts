import mongoose from "mongoose";

const uri =
  "mongodb+srv://hager:hagercontactsapp@cluster0.i4gfy.mongodb.net/contactsapp?retryWrites=true&w=majority";

const connectDb = () => mongoose.connect(uri);

export { connectDb };
