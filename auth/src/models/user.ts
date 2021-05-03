import mongoose from "mongoose";
import { userAttributes, userDocument } from "./attributes";
import { schema } from "./schema";
import { PasswordHasher } from "../utils/passHash";

const User = mongoose.model<userDocument>("User", schema);

//making sure the passed user attributes confronts with the expected types
//and hashing the passwords
const makeUser = async (attributes: userAttributes) => {
  attributes.password = await PasswordHasher.toHash(attributes.password);
  return new User(attributes);
};

export { User, makeUser };
