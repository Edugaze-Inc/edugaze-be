import mongoose from "mongoose";
import { UserAttributes, UserDocument } from "./attributes";
import { schema } from "./schema";
import { PasswordHasher } from "../utils/passHash";

const User = mongoose.model<UserDocument>("User", schema);

// making sure the passed user attributes confronts with the expected types
// and hashing the passwords
const makeUser = async (attributes: UserAttributes) => {
  const password = await PasswordHasher.toHash(attributes.password);

  return new User({ ...attributes, password });
};

export { User, makeUser };
