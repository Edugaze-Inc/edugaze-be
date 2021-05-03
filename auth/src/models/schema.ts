import mongoose from 'mongoose';
import { userAttributes, userDocument, userModel } from './attributes'

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});

const user = mongoose.model<userDocument, userModel>('User', schema);

//making sure the passed user attributes confronts with the expected types
schema.statics.build = (attributes: userAttributes) => {
    return new user(attributes);
};


export { user };
