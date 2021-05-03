import mongoose from 'mongoose';
import { userAttributes, userDocument} from './attributes'

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

const User = mongoose.model<userDocument, any>('User', schema);

//making sure the passed user attributes confronts with the expected types
const makeUser = (attributes: userAttributes) => {
    return new User(attributes);
};


export { User, makeUser };
