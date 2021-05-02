import mongoose from 'mongoose';
import { userAttributes } from './attributes'

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

const user = mongoose.model('User', schema);

//making sure the passed user attributes confronts with the expected types
const makeUser = (attributes: userAttributes) => {
    return new user(attributes);
};


export { user };
